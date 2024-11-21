import React, { useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
// const columns = [
//   "Pr. Line",
//   "Part Number",
//   "Description",
//   "X-Ref",
//   "Cost",
//   "New Cost",
//   "$ Change",
//   "% Change",
//   "Avg Cost",
//   "Product Code",
//   "Regional Price",
//   "List Price",
//   "New List",
//   "$ Change",
//   "% Change",
//   "ZO9",
//   "Qty OH",
//   "ISC",
//   "Stock Per",
//   "Purch Per",
//   "Landed Cost",
//   "Purchase Multiple",
//   "Sell Multiple",
//   "P to Stock",
//   "Sell Unit",
//   "STK Unit",
//   "Pur Unit",
//   "Box Quantity",
//   "Vendor",
//   "Code",
//   "Class",
//   "Group",
//   "Code Description",
//   "Class Description",
//   "Group Description",
//   "Stock",
//   "Purch",
//   "Sales FHI",
//   "Sales Sabre",
//   "Velocity Code",
//   "Company",
// ];

export default function Handontable({ cols, data }) {
  const hotRef = React.useRef(null);
  console.log(cols, "cols");
  console.log(data, "data");
  return (
    <div className="z-[1]">
      <HotTable
        ref={hotRef}
        data={data}
        colHeaders={cols}
        rowHeaders={true}
        editable={true}
        manualColumnMove={true}
        manualColumnResize={true}
        filters={true} // Enable filters
        dropdownMenu={true} // Enable dropdown filter UI
        contextMenu={true} // Enable right-click context menu
        licenseKey="non-commercial-and-evaluation" // Required for free version
        className="htMiddle"
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
}
