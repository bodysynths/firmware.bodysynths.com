"use client";

import React, { useEffect, useState } from "react";

import Header from "./Header";

import InstrumentSelector from "./InstrumentSelector";
import ReleaseSelector from "./ReleaseSelector";
import Connector from "./Connector";

import Help from "./Help";
import ErrorModal from "./ErrorModal";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-8 font-mono">
      <div className="items-center grid gap-6 w-full md:w-4/5 lg:w-7/10 xl:w-3/5 rounded-none">
        <Header />
        <InstrumentSelector />
        <ReleaseSelector />
        <Connector />
        <Help />
        <ErrorModal />
      </div>
    </div>
  );
}
