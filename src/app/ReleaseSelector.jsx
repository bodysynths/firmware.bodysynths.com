"use client";

import { useMemo, useState, useEffect } from "react";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

export function Release({
  idx,
  firmVer,
  isLatest,
  selectedRelease,
  setSelectedRelease,
  openAccordionIndex,
  setOpenAccordionIndex,
}) {
  const date = new Date(firmVer.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="collapse collapse-plus bg-white outline">
      <input
        type="radio"
        name="my-accordion-3"
        checked={openAccordionIndex === idx}
        onChange={() => setOpenAccordionIndex(idx)}
        id={`accordion-item-${idx}`}
      />
      <div className="collapse-title">
        <span className="font-bold">{firmVer.title}</span>
        {` (${formattedDate})`}
        {firmVer.pre && (
          <span className="inline-flex align-middle items-center py-1 px-2 text-xs font-medium text-white bg-red-500 rounded-full ml-2">
            Pre-release
          </span>
        )}
        {isLatest && (
          <span className="inline-flex align-middle items-center py-1 px-2 text-xs font-medium text-white bg-green-500 rounded-full ml-2">
            Latest
          </span>
        )}
      </div>
      <div className="collapse-content space-y-4">
        <div className="space-y-2">
          <div>Release Notes:</div>
          <ul className="list-disc pl-5 space-y-2">
            {firmVer.release_notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <button
            className={`${selectedRelease !== idx ? "" : "btn-disabled"} btn`}
            onClick={() => setSelectedRelease(idx)}
          >
            {selectedRelease !== idx
              ? "Select This Version"
              : "This Version is Selected"}
          </button>
        </div>
      </div>
    </div>
  );
}

const getReleases = (instruments, selectedInstrument) => {
  if (!instruments || !selectedInstrument) {
    return null;
  }
  const index = instruments.findIndex(({ name }) => name === selectedInstrument);
  if (index < 0) {
    return null;
  }
  return instruments[index].releases;
};

export default function ReleaseSelector() {
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const { instruments, selectedInstrument, setErrorMsg } = useStore();

  const releases = useMemo(() => getReleases(instruments, selectedInstrument), [instruments, selectedInstrument]);

  const latestNonPreReleaseIndex = releases && releases.findIndex(
    (release) => !release.pre
  );

  // Set the initial selected release and open accordion
  useEffect(() => {
    if (releases && releases.length > 0) {
      const initialIndex = latestNonPreReleaseIndex !== -1 ? latestNonPreReleaseIndex : 0;
      setSelectedRelease(initialIndex);
      setOpenAccordionIndex(initialIndex);
    } else {
      setSelectedRelease(null);
      setOpenAccordionIndex(null);
    }
  }, [latestNonPreReleaseIndex, releases, selectedInstrument]);

  const selected = typeof selectedRelease === "number";

  useEffect(() => {
    if (!selected || selectedRelease === null || selectedRelease < 0) {
      useStore.setState({ firmwareBinFile: null });
      useStore.setState({ firmwareName: null });
      return;
    }
    
    if (!releases || selectedRelease >= releases.length) {
        return;
    }

    const fileName = releases[selectedRelease].file;
    const firmwareName = releases[selectedRelease].title;
    const fileUrl = getAssetPath(`firmware/${fileName}.bin`);

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        useStore.setState({ firmwareBinFile: new Uint8Array(data) });
        useStore.setState({ firmwareName: firmwareName });
      })
      .catch((error) => {
        setErrorMsg(`Error fetching firmware file: ${error}`);
      });
  }, [selectedRelease, releases, selected, setErrorMsg]);


  if (!releases) {
    return null;
  }

  const rel = selected && selectedRelease !== null && releases[selectedRelease] ? releases[selectedRelease] : null;

  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Firmware Version</h2>
        <div className="space-y-2">
          {releases.map((firmVer, idx) => {
            const isLatest = latestNonPreReleaseIndex !== -1 && idx === latestNonPreReleaseIndex;
            return (
              <Release
                key={idx}
                idx={idx}
                firmVer={firmVer}
                isLatest={isLatest}
                selectedRelease={selectedRelease}
                setSelectedRelease={setSelectedRelease}
                openAccordionIndex={openAccordionIndex}
                setOpenAccordionIndex={setOpenAccordionIndex}
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
