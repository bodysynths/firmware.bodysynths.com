import dfu from './dfu.js';
import dfuse from './dfuse.js';

var firmwareFile = null;
var blinkFirmwareFile = null;
var bootloaderFirmwareFile = null;
var device = null;

export const hex4 = function(n) {
  let s = n.toString(16)
  while (s.length < 4) {
    s = '0' + s;
  }
  return s;
}

export const hexAddr8 = function(n) {
  let s = n.toString(16)
  while (s.length < 8) {
    s = '0' + s;
  }
  return "0x" + s;
}

export const niceSize = function(n) {
  const gigabyte = 1024 * 1024 * 1024;
  const megabyte = 1024 * 1024;
  const kilobyte = 1024;
  if (n >= gigabyte) {
    return n / gigabyte + "GiB";
  } else if (n >= megabyte) {
    return n / megabyte + "MiB";
  } else if (n >= kilobyte) {
    return n / kilobyte + "KiB";
  } else {
    return n + "B";
  }
}

export const formatDFUSummary = function(device) {
  const vid = hex4(device.device_.vendorId);
  const pid = hex4(device.device_.productId);
  const name = device.device_.productName;

  let mode = "Unknown"
  if (device.settings.alternate.interfaceProtocol == 0x01) {
    mode = "Runtime";
  } else if (device.settings.alternate.interfaceProtocol == 0x02) {
    mode = "DFU";
  }

  const cfg = device.settings.configuration.configurationValue;
  const intf = device.settings["interface"].interfaceNumber;
  const alt = device.settings.alternate.alternateSetting;
  const serial = device.device_.serialNumber;
  let info = `${mode}: [${vid}:${pid}] cfg=${cfg}, intf=${intf}, alt=${alt}, name="${name}" serial="${serial}"`;
  return info;
}

export const formatDFUInterfaceAlternate = function(settings) {
  let mode = "Unknown"
  if (settings.alternate.interfaceProtocol == 0x01) {
    mode = "Runtime";
  } else if (settings.alternate.interfaceProtocol == 0x02) {
    mode = "DFU";
  }

  const cfg = settings.configuration.configurationValue;
  const intf = settings["interface"].interfaceNumber;
  const alt = settings.alternate.alternateSetting;
  const name = (settings.name) ? settings.name : "UNKNOWN";

  return `${mode}: cfg=${cfg}, intf=${intf}, alt=${alt}, name="${name}"`;
}

export const fixInterfaceNames = async function(device_, interfaces) {
  // Check if any interface names were not read correctly
  if (interfaces.some(intf => (intf.name == null))) {
    // Manually retrieve the interface name string descriptors
    let tempDevice = new dfu.Device(device_, interfaces[0]);
    await tempDevice.device_.open();
    await tempDevice.device_.selectConfiguration(1);
    let mapping = await tempDevice.readInterfaceNames();
    await tempDevice.close();

    for (let intf of interfaces) {
      if (intf.name === null) {
        let configIndex = intf.configuration.configurationValue;
        let intfNumber = intf["interface"].interfaceNumber;
        let alt = intf.alternate.alternateSetting;
        intf.name = mapping[configIndex][intfNumber][alt];
      }
    }
  }
}

export const populateInterfaceList = function(form, device_, interfaces) {
  let old_choices = Array.from(form.getElementsByTagName("div"));
  for (let radio_div of old_choices) {
    form.removeChild(radio_div);
  }

  let button = form.getElementsByTagName("button")[0];

  for (let i=0; i < interfaces.length; i++) {
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "interfaceIndex";
    radio.value = i;
    radio.id = "interface" + i;
    radio.required = true;

    let label = document.createElement("label");
    label.textContent = formatDFUInterfaceAlternate(interfaces[i]);
    label.className = "radio"
    label.setAttribute("for", "interface" + i);

    let div = document.createElement("div");
    div.appendChild(radio);
    div.appendChild(label);
    form.insertBefore(div, button);
  }
}

export const getDFUDescriptorProperties = function(device) {
  // Attempt to read the DFU functional descriptor
  // TODO: read the selected configuration's descriptor
  return device.readConfigurationDescriptor(0).then(
    data => {
      let configDesc = dfu.parseConfigurationDescriptor(data);
      let funcDesc = null;
      let configValue = device.settings.configuration.configurationValue;
      if (configDesc.bConfigurationValue == configValue) {
        for (let desc of configDesc.descriptors) {
          if (desc.bDescriptorType == 0x21 && desc.hasOwnProperty("bcdDFUVersion")) {
            funcDesc = desc;
            break;
          }
        }
      }

      if (funcDesc) {
        return {
          WillDetach:            ((funcDesc.bmAttributes & 0x08) != 0),
          ManifestationTolerant: ((funcDesc.bmAttributes & 0x04) != 0),
          CanUpload:             ((funcDesc.bmAttributes & 0x02) != 0),
          CanDnload:             ((funcDesc.bmAttributes & 0x01) != 0),
          TransferSize:          funcDesc.wTransferSize,
          DetachTimeOut:         funcDesc.wDetachTimeOut,
          DFUVersion:            funcDesc.bcdDFUVersion
        };
      } else {
        return {};
      }
    },
    error => {}
  );
}

// Current log div element to append to
let logContext = null;

export const setLogContext = function(div) {
  logContext = div;
};

export const clearLog = function(context) {
  if (typeof context === 'undefined') {
    context = logContext;
  }
  if (context) {
    context.innerHTML = "";
  }
}

export const logDebug = function(msg) {
  console.log(msg);
}

export const logInfo = function(msg) {
  if (logContext) {
    let info = document.createElement("p");
    info.className = "info";
    info.textContent = msg;
    logContext.appendChild(info);
  }
}

export const logWarning = function(msg) {
  if (logContext) {
    let warning = document.createElement("p");
    warning.className = "warning";
    warning.textContent = msg;
    logContext.appendChild(warning);
  }
}

export const logError = function(msg) {

}

export const logProgress = function(done, total) {
  if (logContext) {
    let progressBar;
    if (logContext.lastChild.tagName.toLowerCase() == "progress") {
      progressBar = logContext.lastChild;
    }
    if (!progressBar) {
      progressBar = document.createElement("progress");
      logContext.appendChild(progressBar);
    }
    progressBar.value = done;
    if (typeof total !== 'undefined') {
      progressBar.max = total;
    }
  }
}
