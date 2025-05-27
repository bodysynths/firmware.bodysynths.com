"use client";

import { useCallback, useState, useEffect } from "react";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import Dropdown from "./Dropdown";

export default function ReleaseSelector() {
  const { instruments, selectedInstrument, setErrorMsg } = useStore();

  const setSelectedInstrument = useCallback((selectedInstrument) => {
    useStore.setState({ selectedInstrument });
  }, []);

  useEffect(() => {
    fetch(getAssetPath("releases.json"))
      .then((response) => response.json())
      .then((data) => {
        const { instruments } = data;
        useStore.setState({ instruments, selectedInstrument: instruments[0].name });
      })
      .catch((error) => {
        setErrorMsg(`Error fetching releases: ${error}`);
      });
  }, [setErrorMsg]);

  if (!instruments) {
    return null;
  }

  const dropdownInstruments = instruments.map(({ name }) => name);

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Instrument</h2>
        <div className="card-actions ">
          <Dropdown
            options={dropdownInstruments}
            onSelect={setSelectedInstrument}
            curOption={selectedInstrument}
            title={"Select Instrument"}
          />
        </div>
        <div>
          {"Selected Instrument: "}
          <span className="font-bold">{selectedInstrument ? selectedInstrument : "None"}</span>
        </div>
      </div>
    </div>
  );
}
