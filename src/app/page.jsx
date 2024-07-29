"use client";

import React, { useEffect, useState } from "react";
import dfuse, { Device } from "./dfuse";
import styles from "./page.module.css";

import dfu from "./dfu.js";
import {
  connectDevice,
  connect,
  loadBinaryFile,
  programDevice,
} from "./dfu-util-new";

import ReleaseSelector from "./ReleaseSelector";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? process.env.NEXT_PUBLIC_BASE_PATH : "";

export default function Home() {
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState("");
  const [manifestationTolerant, setManifestationTolerant] = useState(null);
  // const [transferSize, setTransferSize] = useState(null);
  const [firmwareFile, setFirmwareFile] = useState(null);

  useEffect(() => {
    async function fetchBinaryFile() {
      const data = await loadBinaryFile(
        basePath + "blink-versions/blink-v2.bin"
      );
      if (data) {
        setFirmwareFile(data);
        console.log(data);
      }
    }
    fetchBinaryFile();
  }, []);

  const connectThisDevice = async () => {
    let newDevice = await connectDevice(
      device,
      setDevice,
      setManifestationTolerant
    );
    // console.log(newDevice);
    // setDevice(newDevice);
  };

  const programThisDevice = async () => {
    console.log(device);
    programDevice(device, setDevice, firmwareFile, manifestationTolerant);
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>DFU Device Manager</h1>
        <button onClick={connectThisDevice}>Connect to Device</button>
        {firmwareFile && device ? (
          <button onClick={programThisDevice}>Program Device</button>
        ) : (
          ""
        )}
        <ReleaseSelector />
      </div>
    </main>
  );
}
