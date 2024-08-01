"use client";

import React, { useEffect, useState } from "react";
import { marked } from "marked";

import dfuse, { Device } from "./dfu/dfuse";
import dfu from "./dfu/dfu.js";
import { connectDevice } from "./dfu/dfu-util-new";

import { getAssetPath } from "./utils";
import { useStore } from "./store";

import ContactLink from "./ContactLink";

export default function Help() {
  const [instructions, setInstructions] = useState("");

  const instrument = useStore((state) => state.instrument);

  const { errorModal, setErrorModal } = useStore();

  useEffect(() => {
    // Fetch the releases.json file from the public directory
    fetch(getAssetPath("windows.md"))
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
        <h2 className="card-title">Help</h2>
        <details className="collapse collapse-arrow outline">
          <summary className="collapse-title font-medium">Windows</summary>
          <div className="collapse-content">
            <article className="prose text-primary-content ">
              <div
                dangerouslySetInnerHTML={{ __html: marked(instructions) }}
              ></div>
            </article>
          </div>
        </details>
        <details className="collapse collapse-arrow outline">
          <summary className="collapse-title font-medium">Contact</summary>
          <div className="collapse-content">
            <p>
              If you have further questions please contact us <ContactLink /> .
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
