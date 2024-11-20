import React, { useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
const columns = [
  "Pr. Line",
  "Part Number",
  "Description",
  "X-Ref",
  "Cost",
  "New Cost",
  "$ Change",
  "% Change",
  "Avg Cost",
  "Product Code",
  "Regional Price",
  "List Price",
  "New List",
  "$ Change",
  "% Change",
  "ZO9",
  "Qty OH",
  "ISC",
  "Stock Per",
  "Purch Per",
  "Landed Cost",
  "Purchase Multiple",
  "Sell Multiple",
  "P to Stock",
  "Sell Unit",
  "STK Unit",
  "Pur Unit",
  "Box Quantity",
  "Vendor",
  "Code",
  "Class",
  "Group",
  "Code Description",
  "Class Description",
  "Group Description",
  "Stock",
  "Purch",
  "Sales FHI",
  "Sales Sabre",
  "Velocity Code",
  "Company",
];

export default function Handontable() {
  return (
    <div>
      <HotTable />
    </div>
  );
}
