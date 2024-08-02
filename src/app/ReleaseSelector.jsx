"use client";

import { useState, useEffect } from "react";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

export function Release({ idx, firmVer, selectedRelease, setSelectedRelease }) {
  const date = new Date(firmVer.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="collapse collapse-plus bg-white outline">
      <input type="radio" name="my-accordion-3" defaultChecked={idx == 0} />
      <div className="collapse-title">
        <span className="font-bold">{firmVer.title}</span>
        {` (${formattedDate})`}
      </div>
      <div className="collapse-content space-y-4">
        <div className="space-y-2">
          <div> Release Notes:</div>

          <ul className="list-disc pl-5 space-y-2">
            {firmVer.release_notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <button
            className={`${selectedRelease != idx ? "" : "btn-disabled"} btn`}
            onClick={() => setSelectedRelease(idx)}
          >
            {selectedRelease != idx
              ? "Select This Version"
              : "This Version is Selected"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReleaseSelector() {
  const [iReleases, setIReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState("");

  const { releases, instrument, setErrorMsg } = useStore();

  const selected = typeof selectedRelease === "number";

  useEffect(() => {
    if (iReleases.length > 0 && !selected) {
      setSelectedRelease(0);
    }
  }, [iReleases]);

  useEffect(() => {
    setIReleases(releases.filter((item) => item.instrument === instrument));
  }, [instrument]);

  useEffect(() => {
    if (!selected) {
      useStore.setState({ firmwareBinFile: null });
      useStore.setState({ firmwareName: null });
      return;
    }

    const fileName = iReleases[selectedRelease].file;
    const firmwareName = iReleases[selectedRelease].title;
    const fileUrl = getAssetPath(`firmware/${fileName}.bin`); // Update with the correct path

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        useStore.setState({ firmwareBinFile: new Uint8Array(data) }); // Store as a byte array
        useStore.setState({ firmwareName: firmwareName });
      })
      .catch((error) => {
        setErrorMsg(`Error fetching firmware file: ${error}`);
      });
  }, [selectedRelease]);

  const rel = selected ? iReleases[selectedRelease] : null;

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Firmware Version</h2>
        <div className="space-y-2">
          {iReleases.map((firmVer, idx) => {
            return (
              <Release
                key={idx}
                idx={idx}
                firmVer={firmVer}
                selectedRelease={selectedRelease}
                setSelectedRelease={setSelectedRelease}
              />
            );
          })}
        </div>
        <div>
          {"Selected Firmware Version: "}
          <span className="font-bold">{rel ? rel.title : "None"}</span>
        </div>
      </div>
    </div>
  );
}
