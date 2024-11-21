"use client";
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import React, { useState, useRef } from "react";

const HandsontableExample = () => {
  const [colHeaders, setColHeaders] = useState(["Name", "Age", "Profession"]);
  const [data, setData] = useState([
    ["John Doe", 30, "Engineer"],
    ["Jane Smith", 28, "Designer"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect"],
    ["Sam Johnson", 35, "Architect", "King"],
  ]);

  const hotRef = useRef(null);

  const afterChange = (changes, source) => {
    if (source === "edit") {
      changes.forEach(([row, col, oldValue, newValue]) => {
        if (oldValue !== newValue) {
          const instance = hotRef.current.hotInstance;
          const cellMeta = instance.getCellMeta(row, col);

          // Mark cell as edited
          cellMeta.className = "changed-cell";
          instance.render();
        }
      });
    }
  };

  const beforeChange = (changes, source) => {
    if (source === "edit") {
      changes.forEach(([row, col, oldValue, newValue]) => {
        // If an edit happens in the column header row (row 0), update the header
        if (row === 0 && oldValue !== newValue) {
          const updatedHeaders = [...colHeaders];
          updatedHeaders[col] = newValue; // Update the column header
          setColHeaders(updatedHeaders); // Update state with the new headers
        }
      });
    }
  };
  const handleHideColmns = () => {
    let updatedHeaders = colHeaders.filter((_, index) => index !== 2);
    let updatedData = data.map((row) => {
      return row.filter((_, index) => index !== 2);
    });
    setColHeaders(updatedHeaders);
    setData(updatedData);
  };
  return (
    <div>
      <h1>Handsontable Example</h1>
      <button onClick={handleHideColmns}>Hide Column</button>
      <HotTable
        ref={hotRef}
        data={data}
        colHeaders={colHeaders}
        rowHeaders={true}
        editable={true}
        manualColumnMove={true}
        manualColumnResize={true}
        filters={true} // Enable filters
        dropdownMenu={true} // Enable dropdown filter UI
        contextMenu={true} // Enable right-click context menu
        licenseKey="non-commercial-and-evaluation" // Required for free version
        afterChange={afterChange}
        beforeChange={beforeChange}
        className="" // Center align content
      />
      <style>
        {`
          .changed-cell {
            font-weight: bold;
            background-color: #d4edda;
          }
        `}
      </style>
    </div>
  );
};

export default HandsontableExample;
