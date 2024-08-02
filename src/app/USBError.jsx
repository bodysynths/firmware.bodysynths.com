"use client";

import React, { useEffect, useState } from "react";

export default function USBError() {
  return (
    <div className="card bg-white text-primary-content w-full">
      <div className="card-body space-y-2">
        <h2 className="card-title">Browser Error</h2>
        <div>This browser does not support Web USB.</div>
        <div>Please Use Chrome Broswer</div>
      </div>
    </div>
  );
}
