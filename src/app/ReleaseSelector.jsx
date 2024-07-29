"use client";

import { useState, useEffect } from "react";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import Dropdown from "./Dropdown";

export default function ReleaseSelector() {
  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState("");

  const firmwareBinFile = useStore((state) => state.firmwareBinFile);

  const selected = typeof selectedRelease === "number";

  useEffect(() => {
    // Fetch the releases.json file from the public directory
    fetch(getAssetPath("releases.json"))
      .then((response) => response.json())
      .then((data) => {
        const sortedReleases = data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setReleases(sortedReleases);
      })
      .catch((error) => {
        console.error("Error fetching releases:", error);
      });
  }, []);

  useEffect(() => {
    // Set the most recent release when the releases state changes
    if (releases.length > 0 && !selected) {
      setSelectedRelease(0);
    }
  }, [releases]);

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
    <div className="card bg-primary text-primary-content w-full">
      <div className="card-body">
        <h2 className="card-title">Select a Release</h2>
        {firmwareBinFile ? (
          <p>
            Firmware binary loaded successfully for {rel.title}. Size:{" "}
            {firmwareBinFile.length} bytes
          </p>
        ) : (
          <p>Select a file to load.</p>
        )}
        {rel && (
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
        )}
        <div className="card-actions justify-end">
          <Dropdown
            options={releases}
            onSelect={setSelectedRelease}
            curOption={rel}
          />
        </div>
      </div>
    </div>
  );
}
