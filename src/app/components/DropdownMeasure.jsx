"use client";
import { useState } from "react";

const data = [
  { key: "prLine", label: "Pr. Line" },
  { key: "partNumber", label: "Part Number" },
  { key: "description", label: "Description" },
  { key: "xRef", label: "X-Ref" },
  { key: "cost", label: "Cost" },
  { key: "newCost", label: "New Cost" },
  { key: "dollarChange", label: "$ Change" },
  { key: "percentChange", label: "% Change" },
  { key: "avgCost", label: "Avg Cost" },
  { key: "productCode", label: "Product Code" },
  { key: "regionalPrice", label: "Regional Price" },
  { key: "list", label: "List Price" },
  { key: "newList", label: "New List" },
  { key: "dollarChangeList", label: "$ Dollar Change" },
  { key: "percentChangeList", label: "% Dollar Change" },
  { key: "zo9", label: "ZO9" },
  { key: "qtyOH", label: "Qty OH" },
  { key: "isc", label: "ISC" },
  { key: "stockPer", label: "Stock Per" },
  { key: "purchPer", label: "Purch Per" },
  { key: "landedCost", label: "Landed Cost" },
  { key: "pMult", label: "Purchase Multiple" },
  { key: "sMult", label: "Sell Multiple" },
  { key: "pToStock", label: "P to Stock" },
  { key: "sellUnit", label: "Sell Unit" },
  { key: "stkUnit", label: "STK Unit" },
  { key: "purUnit", label: "Pur Unit" },
  { key: "boxQty", label: "Box Quantity" },
  // { key: "vname", label: "Vendor" },
  // { key: "branch", label: "Branch" },
  { key: "code", label: "Code" },
  { key: "class", label: "Class" },
  { key: "group", label: "Group" },
  { key: "codeDesc", label: "Code Description" },
  { key: "classDesc", label: "Class Description" },
  { key: "groupDesc", label: "Group Description" },
  // { key: "stock", label: "Stock Per" },
  { key: "salesFHI", label: "Sales FHI" },
  { key: "salesSabre", label: "Sales Sabre" },
  { key: "vcode", label: "Velocity Code" },
  // { key: "company", label: "Company" },
];

export default function DropdownMeasure({
  display,
  setDisplay,
  visibleColumns,
  setVisibleColumns,
}) {
  // console.log(data, "data dropdown");
  const [dropdown, setDropdown] = useState([...data]);
  const [dropdownKeys, setDropdownKeys] = useState(
    data.map((item) => item.key)
  );
  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };
  const changeDisplay = () => {
    if (display === "hidden") {
      setDisplay("visible");
    } else {
      setDisplay("hidden");
    }
  };
  const selectAll = () => {
    const allKeys = dropdownKeys; // Extract all column keys
    setVisibleColumns(allKeys);
  };
  const deselectAll = () => {
    setVisibleColumns([]); // Deselect all items
  };
  return (
    <div
      className="relative font-inter text-xs"
      onMouseEnter={changeDisplay}
      onMouseLeave={changeDisplay}
      data-twe-dropdown-ref
    >
      <button
        className="flex items-center py-2 rounded bg-primary text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none"
        type="button"
        id="dropdownMenuButton1"
        data-twe-dropdown-toggle-ref
        aria-expanded="false"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        Measures
        <span className="w-2 [&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <ul
        className={`absolute min-w-0 max-w-auto hidden-scrollbar ${
          display === "visible"
            ? "shadow-lg z-[3] rounded-lg px-3 py-2 space-y-4 bg-white max-h-96 overflow-y-scroll"
            : "p-0 space-y-0 bg-transparent max-h-0 overflow-hidden"
        }`}
        aria-labelledby="dropdownCheckboxButton"
        onMouseEnter={() => setDisplay("visible")}
      >
        {display === "visible" && (
          <>
            {/* Add "All" and "None" options */}
            <li onClick={selectAll}>
              <div className="flex items-center">
                <label
                  htmlFor="checkbox-all"
                  className="ms-2 text-xs font-inter text-gray-900 cursor-pointer"
                >
                  All
                </label>
              </div>
            </li>
            <li onClick={deselectAll}>
              <div className="flex items-center">
                <label
                  htmlFor="checkbox-none"
                  className="ms-2 text-xs font-inter text-gray-900 cusror-pointer"
                >
                  None
                </label>
              </div>
            </li>
            <hr className="border-gray-300" />
            {/* Map the rest of the items */}
            {dropdown.map((item) => (
              <li key={item}>
                <div className="flex items-center w-28" key={item.key}>
                  <input
                    id={`checkbox-${item.key}`}
                    type="checkbox"
                    checked={visibleColumns.includes(item.key)}
                    onChange={() => toggleColumn(item.key)}
                    className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700"
                  />
                  <label
                    htmlFor={`checkbox-${item.label}`}
                    className="ms-2 text-xs font-inter text-gray-900"
                  >
                    {item.label}
                  </label>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
