"use client";

import React, { useEffect, useState } from "react";
import dfuse, { Device } from "./dfu/dfuse";

import dfu from "./dfu/dfu.js";
import {
  connectDevice,
  connect,
  loadBinaryFile,
  programDevice,
} from "./dfu/dfu-util-new";

import ReleaseSelector from "./ReleaseSelector";

import { getAssetPath } from "./utils";

import { useStore } from "./store";

export default function Programmer() {
  const [progress, setProgress] = useState(0);

  const firmwareBinFile = useStore((state) => state.firmwareBinFile);
  const device = useStore((state) => state.device);
  const manifestationTolerant = useStore(
    (state) => state.manifestationTolerant
  );

  const setDevice = (d) => {
    useStore.setState({ device: d });
  };

  const programThisDevice = async () => {
    // console.log(device);
    programDevice(device, setDevice, firmwareBinFile, manifestationTolerant);
  };

  if (device) {
    device.logProgress = (done, total) => {
      setProgress((100 * done) / total);
      console.log(done, total);
    };
  }

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body">
        <h2 className="card-title">Update Device</h2>
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"
        ></progress>
        <div className="card-actions justify-end">
          <button
            className={`${
              firmwareBinFile && device ? "" : "btn-disabled"
            } btn-primary btn btn-outline`}
            onClick={programThisDevice}
          >
            Update Device
          </button>
        </div>
      </div>
    </div>
  );
}
