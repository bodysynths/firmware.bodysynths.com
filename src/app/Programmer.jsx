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
  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(false);

  const firmwareBinFile = useStore((state) => state.firmwareBinFile);
  const device = useStore((state) => state.device);
  const manifestationTolerant = useStore(
    (state) => state.manifestationTolerant
  );

  const enabled = firmwareBinFile && device && done;

  console.log(device != null, firmwareBinFile != null, done);

  const setDevice = (d) => {
    useStore.setState({ device: d });
  };

  const onFinish = () => {
    setDone(true);
    // setProgress(0);
  };

  useEffect(() => {
    if (enabled && progress == 100) {
      setProgress(0);
    }
  }, [device]);

  const programThisDevice = async () => {
    if (!enabled) {
      return;
    }
    setLoading(true);
    programDevice(
      device,
      setDevice,
      firmwareBinFile,
      manifestationTolerant,
      onFinish
    );
  };

  if (device) {
    device.logProgress = (prog, total) => {
      if (loading && prog > 0 && prog < total) {
        setDone(false);
        setLoading(false);
      }
      setProgress((100 * prog) / total);
    };
  }

  return (
    <button
      className={`${
        enabled && !loading ? "" : "btn-disabled"
      } radial-progress bg-black text-white border-black border ${
        !loading && !done ? "cursor-default" : ""
      }`}
      style={{
        "--value": progress,
        "--thickness": progress == 0 ? 0 : "calc(var(--size) / 10)",
        "--size": "8rem",
      }}
      role="progressbar"
      onClick={programThisDevice}
    >
      {loading
        ? "Updating"
        : enabled || progress == 0
        ? "Update"
        : progress == 100
        ? "Done"
        : progress.toFixed(0) + "%"}
    </button>
  );
}
