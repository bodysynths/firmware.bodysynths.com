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
  const firmwareName = useStore((state) => state.firmwareName);

  const enabled = firmwareBinFile && device && done;

  const setDevice = (d) => {
    useStore.setState({
      device: d,
      errorMsg: "",
    });
  };

  const onFinish = () => {
    setDone(true);
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
      const per = (100 * prog) / total;
      setProgress(per);
    };

    device.logError = (msg) => {
      setLoading(false);
      setDone(true);
      setProgress(0);

      useStore.setState({
        device: null,
        errorModal: true,
        errorMsg: msg,
      });
    };
  }

  return (
    <button
      className={`btn ${
        enabled && !loading ? "" : "btn-disabled"
      }  w-full bg-black text-white border-black border relative ${
        !loading && !done ? "cursor-default" : ""
      }`}
      onClick={programThisDevice}
    >
      {!loading && !done && (
        <progress
          className="progress w-full absolute inset-0 h-full bg-black"
          style={{
            mixBlendMode: "difference",
            backgroundColor: "rgba(1,1,1,1)",
          }}
          value={progress}
          max="100"
        ></progress>
      )}
      {loading ? (
        <>
          Erasing Memory{" "}
          <span className="loading loading-spinner loading-xs"></span>
        </>
      ) : enabled || progress == 0 ? (
        `Update to ${firmwareName}`
      ) : progress == 100 ? (
        `Finished Updating to ${firmwareName}`
      ) : (
        progress.toFixed(0) + "%"
      )}
    </button>
  );
}
