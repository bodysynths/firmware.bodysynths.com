"use client";

import React, { useEffect, useState } from "react";
import dfuse, { Device } from "./dfu/dfuse";

import dfu from "./dfu/dfu.js";
import { connectDevice } from "./dfu/dfu-util-new";

import ReleaseSelector from "./ReleaseSelector";

import { getAssetPath } from "./utils";

import { useStore } from "./store";

export default function Connector() {
  //   const [device, setDevice] = useState(null);
  const [status, setStatus] = useState("");
  //   const [manifestationTolerant, setManifestationTolerant] = useState(null);

  const firmwareBinFile = useStore((state) => state.firmwareBinFile);
  const device = useStore((state) => state.device);
  const manifestationTolerant = useStore(
    (state) => state.manifestationTolerant
  );

  const setDevice = (d) => {
    useStore.setState({ firmwareBinFile: d });
  };

  const setManifestationTolerant = (m) => {
    useStore.setState({ manifestationTolerant: m });
  };

  const connectThisDevice = async () => {
    let newDevice = await connectDevice(
      device,
      setDevice,
      setManifestationTolerant
    );
  };
  return (
    <div className="card bg-primary text-primary-content w-full">
      <div className="card-body">
        <h2 className="card-title">Connect Device</h2>
        <p>Plug in device click buttons</p>
        <p>{device ? `Connected to ${device}` : "No Device Connected"}</p>
        <div className="card-actions justify-end">
          <button className="btn" onClick={connectThisDevice}>
            Connect to Device
          </button>
        </div>
      </div>
    </div>
  );
}
