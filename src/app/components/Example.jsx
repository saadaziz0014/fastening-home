"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Handsontable = dynamic(() => import("handsontable/base"), { ssr: false });
const HotTable = dynamic(
  () => import("@handsontable/react").then((mod) => mod.HotTable),
  { ssr: false }
);

// Import Handsontable CSS
import "handsontable/dist/handsontable.full.min.css";

const HandsontableWrapper = () => {
  const data = [
    ["Item 1", "Item 2", "Item 3"],
    ["Item 4", "Item 5", "Item 6"],
    ["Item 7", "Item 8", "Item 9"],
  ];
  const hotRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <HotTable
      ref={hotRef}
      data={data}
      licenseKey="non-commercial-and-evaluation"
      colHeaders={true}
      rowHeaders={true}
      editable={true}
      manualColumnMove={true}
      manualColumnResize={true}
      manualRowResize={true}
      filter={true}
      width="100%"
      height="300px"
      // Add any other Handsontable options here
    />
  );
};

export default HandsontableWrapper;
