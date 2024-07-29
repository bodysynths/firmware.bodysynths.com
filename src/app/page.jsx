"use client";

import React, { useEffect, useState } from "react";

import Header from "./Header";
import ReleaseSelector from "./ReleaseSelector";
import Connector from "./Connector";
import Programmer from "./Programmer";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-8 font-mono">
      <div className="items-center grid gap-6">
        <Header />
        <Connector />
        <ReleaseSelector />
        <Programmer />
      </div>
    </div>
  );
}
