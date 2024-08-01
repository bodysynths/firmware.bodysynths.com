import dfu from "./dfu.js";
import dfuse, { Device } from "./dfuse";

import {
  fixInterfaceNames,
  connectToSelectedInterface,
  getDFUDescriptorProperties,
  hex4,
  dfuDisplay,
  niceSize,
  hexAddr8,
  logDebug,
  logInfo,
  logWarning,
  logError,
  logProgress,
} from "./dfu-util.js";

export async function loadBinaryFile(filename) {
  try {
    const response = await fetch(`${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error("Failed to load binary file:", error);
    return null;
  }
}

export const connect = async (device, setManifestationTolerant) => {
  try {
    await device.open();
  } catch (error) {
    onDisconnect(error);
    throw error;
  }

  // Attempt to parse the DFU functional descriptor
  let desc = {};
  try {
    desc = await getDFUDescriptorProperties(device);
  } catch (error) {
    onDisconnect(error);
    throw error;
  }

  let memorySummary = "";
  if (desc && Object.keys(desc).length > 0) {
    device.properties = desc;
    if (desc.CanDnload) {
      setManifestationTolerant(desc.ManifestationTolerant);
    }

    if (
      desc.DFUVersion == 0x011a &&
      device.settings.alternate.interfaceProtocol == 0x02
    ) {
      device = new dfuse.Device(device.device_, device.settings);
    }
  }

  device.logDebug = logDebug;
  device.logInfo = logInfo;
  device.logWarning = logWarning;
  device.logError = logError;
  device.logProgress = logProgress;

  if (device.memoryInfo) {
    let segment = device.getFirstWritableSegment();
    if (segment) {
      if (segment.start === 0x90000000) segment.start += 0x40000;
      device.startAddress = segment.start;
    }
  }
  return device;
};

export const onDisconnect = () => {
  // console.log("DISCONNECTED");
};

export const connectDevice = async (
  device,
  setDevice,
  setManifestationTolerant,
  logError = (error) => {
    console.log(error);
  }
) => {
  if (device) {
    device.close().then(onDisconnect);
    device = null;
  }
  navigator.usb
    .requestDevice({ filters: [{ vendorId: 0x483, productId: 57105 }] })
    .then(async (selectedDevice) => {
      let interfaces = dfu.findDeviceDfuInterfaces(selectedDevice);
      if (interfaces.length == 0) {
        statusDisplay.textContent =
          "The selected device does not have any USB DFU interfaces.";
      } else if (interfaces.length == 1) {
        await fixInterfaceNames(selectedDevice, interfaces);
        const newDevice = await connect(
          new dfu.Device(selectedDevice, interfaces[0]),
          setManifestationTolerant
        );
        setDevice(newDevice);
      } else {
        await fixInterfaceNames(selectedDevice, interfaces);
        async function connectToSelectedInterface() {
          let filteredInterfaceList = interfaces.filter((ifc) =>
            ifc.name.includes("0x08000000")
          );
          if (filteredInterfaceList.length === 0) {
            logError("No interace with flash address 0x08000000 found.");
            statusDisplay.textContent =
              "The selected device does not have a Flash Memory sectiona at address 0x08000000.";
          } else {
            const newDevice = await connect(
              new dfu.Device(selectedDevice, filteredInterfaceList[0]),
              setManifestationTolerant
            );
            setDevice(newDevice);
          }
        }
        await connectToSelectedInterface();
      }
    })
    .catch((error) => {
      logError(error);
    });
};

export const programDevice = async (
  device,
  setDevice,
  firmwareFile,
  manifestationTolerant,
  setDone
) => {
  // console.log("PROGRAM");
  const transferSize = 1024;
  if (device && firmwareFile != null) {
    // setLogContext(downloadLog);
    // clearLog(downloadLog);
    try {
      let status = await device.getStatus();
      if (status.state == dfu.dfuERROR) {
        await device.clearStatus();
      }
    } catch (error) {
      device.logWarning("Failed to clear status");
    }
    await device
      .do_download(transferSize, firmwareFile, manifestationTolerant)
      .then(
        () => {
          // console.log("PROGRAM DONE");
          // logInfo("Done!");
          // setLogContext(null);
          if (!manifestationTolerant) {
            device.waitDisconnected(5000).then(
              (dev) => {
                onDisconnect();
                setDevice(null);
                setDone();
              },
              (error) => {
                // It didn't reset and disconnect for some reason...
                device.logError("Device unexpectedly tolerated manifestation.");
              }
            );
          }
        },
        (error) => {
          // console.log("PROGRAM ERROR");
          device.logError(error);
        }
      );
  }
};
