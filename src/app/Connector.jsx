"use client";

import React, { useEffect, useState } from "react";
import { marked } from "marked";

import dfuse, { Device } from "./dfu/dfuse";
import dfu from "./dfu/dfu.js";
import { connectDevice } from "./dfu/dfu-util-new";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import Programmer from "./Programmer";

export default function Connector() {
  //   const [device, setDevice] = useState(null);
  const [status, setStatus] = useState("");
  const [instructions, setInstructions] = useState("");

  const firmwareBinFile = useStore((state) => state.firmwareBinFile);
  const device = useStore((state) => state.device);
  const manifestationTolerant = useStore(
    (state) => state.manifestationTolerant
  );
  const instrument = useStore((state) => state.instrument);

  const setDevice = (d) => {
    useStore.setState({ device: d });
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

  useEffect(() => {
    // Fetch the releases.json file from the public directory
    fetch(getAssetPath("instructions.md"))
      .then((response) => response.text())
      .then((data) => {
        // console.log(data);
        setInstructions(data);
      })
      .catch((error) => {
        console.error("Error fetching instructions:", error);
      });
  }, []);

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Connect Device</h2>
        <article className="prose text-primary-content max-w-none">
          <div dangerouslySetInnerHTML={{ __html: marked(instructions) }}></div>
        </article>
        {/* <p>{device ? `Connected to device` : "No Device Connected"}</p> */}
        <div className="card-actions">
          <button
            className={`${device && "btn-disabled"} btn w-full`}
            onClick={connectThisDevice}
          >
            {device ? `${instrument} Connected` : `Connect to ${instrument}`}
          </button>
        </div>
        <div className="card-actions justify-center flex items-center">
          {/* <div className="justify-end"> */}
          <Programmer />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
