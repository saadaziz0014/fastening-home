import React, { useEffect, useState } from "react";

const columns = [
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
  { key: "dollarChangeList", label: "$ Change" },
  { key: "percentChangeList", label: "% Change" },
  { key: "zo9", label: "ZO9" },
  { key: "qtyOH", label: "Qty OH" },
  { key: "isc", label: "ISC" },
  { key: "stockPer", label: "Stock %" },
  { key: "purchPer", label: "Purch %" },
  { key: "landedCost", label: "Landed Cost" },
  { key: "pMult", label: "Purchase Multiple" },
  { key: "sMult", label: "Sell Multiple" },
  { key: "pToStock", label: "P to Stock" },
  { key: "sellUnit", label: "Sell Unit" },
  { key: "stkUnit", label: "STK Unit" },
  { key: "purUnit", label: "Pur Unit" },
  { key: "boxQty", label: "Box Quantity" },
  { key: "vnd", label: "Vendor" },
  { key: "code", label: "Code" },
  { key: "class", label: "Class" },
  { key: "group", label: "Group" },
  { key: "codeDesc", label: "Code Description" },
  { key: "classDesc", label: "Class Description" },
  { key: "groupDesc", label: "Group Description" },
  { key: "stock", label: "Stock" },
  { key: "salesFHI", label: "Sales FHI" },
  { key: "salesSabre", label: "Sales Sabre" },
  { key: "vcode", label: "Velocity Code" },
];

const TableComponent = ({ visibleColumns, initialData }) => {
  const [data, setData] = useState(initialData);

  // Handle cell content update
  const handleCellChange = (rowIndex, columnKey, value) => {
    const newData = [...data];
    newData[rowIndex][columnKey] = value;
    setData(newData);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  // Handle column visibility toggle

  return (
    <div className="p-4 h-64 overflow-y-scroll .hidden-scrollbar">
      {/* Column Visibility Controls */}
      {/* <div className="mb-4">
        {columns.map((col) => (
          <label key={col.key} className="mr-4">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.key)}
              onChange={() => toggleColumn(col.key)}
            />
            {col.label}
          </label>
        ))}
      </div> */}

      {/* Table */}
      <div className="overflow-x-scroll hidden-scrollbar">
        <table className="border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {columns.map(
                (col) =>
                  visibleColumns.includes(col.key) && (
                    <th
                      key={col.key}
                      className="border p-2 text-xs"
                      style={{ minWidth: "100px" }}
                    >
                      {col.label}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(
                  (col) =>
                    visibleColumns.includes(col.key) && (
                      <td
                        key={col.key}
                        className="border p-2 text-center text-xs"
                        style={{ minWidth: "100px" }}
                        onClick={() => {}}
                      >
                        <EditableCell
                          value={row[col.key]}
                          onChange={(value) =>
                            handleCellChange(rowIndex, col.key, value)
                          }
                        />
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Editable Cell Component
const EditableCell = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isModified, setIsModified] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    setIsModified(currentValue !== value);
    onChange(currentValue);
  };

  return isEditing ? (
    <input
      type="text"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
      className="border p-1"
    />
  ) : (
    <span
      onClick={() => setIsEditing(true)}
      className={isModified ? "font-bold" : ""}
    >
      {currentValue}
    </span>
  );
};

export default TableComponent;
