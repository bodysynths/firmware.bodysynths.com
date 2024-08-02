"use client";

import { getAssetPath } from "./utils";

export default function Header() {
  return (
    <div className="card text-white w-full items-center ">
      <a href="https://bodysynths.com/">
        <img
          className="w-full"
          src={getAssetPath("header.png")}
          alt="Body Synths Logo"
        />
      </a>
      <div>Firmware Update Utility</div>
    </div>
  );
}
