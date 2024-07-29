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
  const firmwareBinFile = useStore((state) => state.firmwareBinFile);
  const device = useStore((state) => state.device);
  const manifestationTolerant = useStore(
    (state) => state.manifestationTolerant
  );

  const setDevice = (d) => {
    useStore.setState({ firmwareBinFile: d });
  };

  const programThisDevice = async () => {
    console.log(device);
    programDevice(device, setDevice, firmwareBinFile, manifestationTolerant);
  };

  return (
    <div className="card bg-primary text-primary-content w-full">
      <div className="card-body">
        <h2 className="card-title">Program Device</h2>
        <div className="card-actions justify-end">
          <button
            className={firmwareBinFile && device ? "btn" : "btn-disabled"}
            onClick={programThisDevice}
          >
            Program Device
          </button>
        </div>
      </div>
    </div>
  );
}
