"use client";

import { useEffect, useState } from "react";

export default function Dropdown({
  label,
  data,
  display,
  setDisplay,
  initialData,
  setInitialData,
  type,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    setSelectedItems(data);
  }, [data]);
  const changeDisplay = () => {
    if (display === "hidden" && data.length > 0) {
      setDisplay("visible");
    } else {
      setDisplay("hidden");
    }
  };
  const toggleColumn = (key) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.includes(key)
        ? prevSelectedItems.filter((item) => item !== key)
        : [...prevSelectedItems, key];

      // console.log(updatedItems, "updatedItems");
      if (type == "prdline") {
        // console.log(initialData, "initialData");
        let dataH = initialData.filter((item) =>
          updatedItems.includes(item.prLine)
        );
        // console.log(dataH, "dataH");
        setInitialData(dataH);
      }
      if (type == "vline") {
        // console.log(updatedItems, "updatedItems");
        let dataH = initialData.filter((item) =>
          updatedItems.includes(item.vname)
        );
        // console.log(dataH, "dataH");
        setInitialData(dataH);
      }
      // if (type == "company") {
      //   let dataH = initialData.filter((item) =>
      //     updatedItems.includes(item.company)
      //   );
      //   // console.log(dataH, "dataH");
      //   setInitialData(dataH);
      // }
      return updatedItems;
    });
  };
  const selectAll = () => {
    setSelectedItems(data); // Set all items as selected
    fileringOfData();
  };

  const fileringOfData = () => {
    let dataH = [];
    if (type == "prdline") {
      dataH = initialData.filter((item) => data.includes(item.prLine));
      // console.log(dataH, "dataH");
    }
    if (type == "vline") {
      dataH = initialData.filter((item) => data.includes(item.vname));
      // console.log(dataH, "dataH");
    }
    // if (type == "company") {
    //   console.log(data, "data");
    //   console.log(initialData, "initialData");
    //   dataH = initialData.filter((item) => data.includes(item.company));
    //   // console.log(dataH, "dataH");
    // }
    setInitialData(dataH);
  };

  // Deselect all items
  const deselectAll = () => {
    setSelectedItems([]); // Clear the selection
    setInitialData([]);
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
        {label}
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
            ? "shadow-lg rounded-lg px-3 py-2 space-y-4 bg-white max-h-32 overflow-y-scroll"
            : "p-0 space-y-0 bg-transparent max-h-0 overflow-hidden"
        }`}
        aria-labelledby="dropdownCheckboxButton"
        onMouseEnter={() => setDisplay("visible")}
      >
        {display === "visible" && (
          <>
            {/* Add "All" and "None" options */}
            <li>
              <div className="flex items-center">
                <label
                  htmlFor="checkbox-all"
                  className="ms-2 text-xs cursor-pointer font-inter text-gray-900"
                  onClick={selectAll}
                >
                  All
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <label
                  htmlFor="checkbox-none"
                  className="ms-2 text-xs cursor-pointer font-inter text-gray-900"
                  onClick={deselectAll}
                >
                  None
                </label>
              </div>
            </li>
            <hr className="border-gray-300" />
            {/* Map the rest of the items */}
            {data.map((item) => (
              <li key={item}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-${item}`}
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleColumn(item)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700"
                  />
                  <label
                    htmlFor={`checkbox-${item}`}
                    className="ms-2 text-xs font-inter text-gray-900"
                  >
                    {item}
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
