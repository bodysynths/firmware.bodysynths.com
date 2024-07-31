"use client";

import { useState, useEffect } from "react";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import Dropdown from "./Dropdown";

export default function ReleaseSelector() {
  //   const [releases, setReleases] = useState([]);
  const [instruments, setInstruments] = useState("");

  const releases = useStore((state) => state.releases);
  const instrument = useStore((state) => state.instrument);

  const setInstrument = (i) => {
    useStore.setState({ instrument: i });
  };

  useEffect(() => {
    // Fetch the releases.json file from the public directory
    fetch(getAssetPath("releases.json"))
      .then((response) => response.json())
      .then((data) => {
        const sortedReleases = data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        useStore.setState({ releases: sortedReleases });

        const instruments = sortedReleases.map((item) => item.instrument);
        if (instruments.length > 0) {
          useStore.setState({ instrument: instruments[0] });
        }
        setInstruments([...new Set(instruments)]);
      })
      .catch((error) => {
        console.error("Error fetching releases:", error);
      });
  }, []);

  useEffect(() => {
    // Set the most recent release when the releases state changes
    // if (releases.length > 0 && !selected) {
    //   setSelectedRelease(0);
    // }
  }, [releases]);

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Instrument</h2>
        <div className="card-actions ">
          <Dropdown
            options={instruments}
            onSelect={setInstrument}
            curOption={instrument}
            title={"Select Instrument"}
          />
        </div>
        <div>
          {"Selected Instrument: "}
          <span className="font-bold">{instrument ? instrument : "None"}</span>
        </div>
      </div>
    </div>
  );
}
