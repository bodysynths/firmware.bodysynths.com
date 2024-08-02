"use client";

import React, { useEffect, useState } from "react";
import { marked } from "marked";

import { connectDevice } from "./dfu/dfu-util-new";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import Programmer from "./Programmer";

export default function Connector() {
  const [instructions, setInstructions] = useState("");
  const [filters, setFilters] = useState([]);

  const { device, instrument, setErrorMsg } = useStore();

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
      setManifestationTolerant,
      setErrorMsg,
      filters
    );
  };

  useEffect(() => {
    fetch(getAssetPath("USBvendorID.json"))
      .then((response) => response.json())
      .then((data) => {
        setFilters(data.filters);
      })
      .catch((error) => {
        setErrorMsg(`Error fetching vendor info: ${error}`);
      });

    fetch(getAssetPath("instructions.md"))
      .then((response) => response.text())
      .then((data) => {
        setInstructions(data);
      })
      .catch((error) => {
        setErrorMsg(`Error fetching instructions: ${error}`);
      });
  }, []);

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Connect Device</h2>
        <article className="prose text-primary-content max-w-none w-full">
          <div dangerouslySetInnerHTML={{ __html: marked(instructions) }}></div>
        </article>
        <div className="card-actions">
          <button
            className={`${device && "btn-disabled"} btn w-full`}
            onClick={connectThisDevice}
          >
            {device ? `${instrument} Connected` : `Connect to ${instrument}`}
          </button>
        </div>
        <div className="card-actions justify-center flex items-center">
          <Programmer />
        </div>
      </div>
    </div>
  );
}
