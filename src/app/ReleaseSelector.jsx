"use client";

import { useState, useEffect } from "react";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import Dropdown from "./Dropdown";

export default function ReleaseSelector() {
  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState("");

  const firmwareBinFile = useStore((state) => state.firmwareBinFile);
  const releasesAll = useStore((state) => state.releases);
  const instrument = useStore((state) => state.instrument);

  const selected = typeof selectedRelease === "number";

  useEffect(() => {
    // Set the most recent release when the releases state changes
    if (releases.length > 0 && !selected) {
      setSelectedRelease(0);
    }
  }, [releases]);

  useEffect(() => {
    setReleases(releasesAll.filter((item) => item.instrument === instrument));
  }, [instrument]);

  useEffect(() => {
    if (!selected) {
      useStore.setState({ firmwareBinFile: null });
      return;
    }

    const fileName = releases[selectedRelease].file;
    const fileUrl = getAssetPath(`firmware/${fileName}.bin`); // Update with the correct path

    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        useStore.setState({ firmwareBinFile: new Uint8Array(data) }); // Store as a byte array
      })
      .catch((error) => {
        console.error("Error loading file:", error);
      });
  }, [selectedRelease]);

  const rel = selected ? releases[selectedRelease] : null;

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body">
        <h2 className="card-title">Firmware</h2>
        {/* {firmwareBinFile ? (
          <p>
            Firmware binary loaded successfully for {rel.title}. Size:{" "}
            {firmwareBinFile.length} bytes
          </p>
        ) : (
          <p>Select a file to load.</p>
        )} */}

        {releases.map((firmVer, idx) => {
          return (
            <div
              className="collapse collapse-plus bg-base-200 text-white"
              key={idx}
            >
              <input
                type="radio"
                name="my-accordion-3"
                defaultChecked={idx == 0}
              />
              <div className="collapse-title ">{firmVer.title}</div>
              <div className="collapse-content space-y-4">
                <div>
                  <div> Release Notes:</div>

                  <ul className="list-disc pl-5 space-y-2">
                    {firmVer.release_notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button
                    className={`${
                      selectedRelease != idx ? "" : "btn-disabled"
                    } btn-primary btn btn-outline`}
                    onClick={() => setSelectedRelease(idx)}
                  >
                    {selectedRelease != idx
                      ? "Select This Version"
                      : "This Version Selected"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div>Selected Firmware Version: {rel ? rel.title : "None"}</div>

        {/* {rel && (
          <details className="collapse bg-base-200 text-gray-300 collapse-arrow">
            <summary className="collapse-title">
              Release Notes {rel ? `(${rel.title})` : ""}
            </summary>
            <div className="collapse-content">
              <ul className="list-disc pl-5 space-y-2">
                {rel.release_notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </details>
        )} */}

        {/* <div className="card-actions justify-end">
          <Dropdown
            options={releases}
            onSelect={setSelectedRelease}
            curOption={rel}
          />
        </div> */}
      </div>
    </div>
  );
}
