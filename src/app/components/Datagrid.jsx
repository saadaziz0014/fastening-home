import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
};

export default function Datagrid({ data, columns, visibleColumns }) {
  const [rowData, setRowData] = useState([...data]);
  const [columnData, setColumnData] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");
  const [selectedColumn, setSelectedColumn] = useState(""); // New state for selected column

  useEffect(() => {
    setRowData(data);
    let updatedColumns = columns.filter((col) =>
      visibleColumns.includes(col.field)
    );
    setColumnData(updatedColumns);
  }, [data, visibleColumns]);

  const addColumn = () => {
    if (!newColumnName) return;

    // Create new column definition
    const newColumn = {
      field: newColumnName.toLowerCase().replace(/\s+/g, "_"),
      headerName: newColumnName,
      sortable: true,
      filter: true,
    };

    // Add specific properties based on column type
    if (newColumnType === "number") {
      newColumn.filter = "agNumberColumnFilter";
      newColumn.valueParser = (params) => Number(params.newValue);
    } else if (newColumnType === "date") {
      newColumn.filter = "agDateColumnFilter";
      newColumn.valueFormatter = (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "";
    }

    // Determine position to insert the new column
    let position = columnData.findIndex((col) => col.field === selectedColumn);

    let updatedColumns;
    if (position >= 0) {
      updatedColumns = [
        ...columnData.slice(0, position + 1),
        newColumn,
        ...columnData.slice(position + 1),
      ];
    } else {
      // If no column is selected, append at the end
      updatedColumns = [...columnData, newColumn];
    }

    // Update column definitions
    setColumnData(updatedColumns);

    // Update row data with empty values for new column
    setRowData((prev) =>
      prev.map((row) => ({
        ...row,
        [newColumn.field]: "",
      }))
    );

    // Reset inputs
    setNewColumnName("");
    setSelectedColumn("");
  };

  return (
    <>
      <div>
        <div className="flex gap-4 items-end mb-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Column Name</label>
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="px-3 py-2 border rounded"
              placeholder="Enter column name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Column Type</label>
            <select
              value={newColumnType}
              onChange={(e) => setNewColumnType(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Add After Column
            </label>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Select Column</option>
              {columns.map(
                (col) =>
                  col.field != "id" && (
                    <option key={col.field} value={col.field}>
                      {col.field}
                    </option>
                  )
              )}
            </select>
          </div>

          <button
            onClick={addColumn}
            className="px-4 py-2 bg-[#614d87] text-white rounded hover:bg-purple-900"
          >
            Add Column
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine w-full h-96">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnData}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={30}
          onCellValueChanged={(event) => {
            // console.log(event);
            setRowData((prev) =>
              prev.map((row) => {
                if (row.id === event.data.id) {
                  if (event.colDef.field === "cost") {
                    let newCost = event.data.newCost;
                    if (!newCost) {
                      return { ...row, [event.colDef.field]: event.newValue };
                    }
                    let dollarChange = newCost - event.newValue;
                    let percentChange = Math.round(
                      (dollarChange / newCost) * 100
                    );
                    return {
                      ...row,
                      [event.colDef.field]: event.newValue,
                      newCost: newCost,
                      dollarChange: dollarChange,
                      percentChange: percentChange,
                    };
                  } else if (event.colDef.field === "newCost") {
                    let cost = event.data.cost;
                    if (!cost) {
                      return { ...row, [event.colDef.field]: event.newValue };
                    }
                    let dollarChange = event.newValue - cost;
                    let percentChange = Math.round((dollarChange / cost) * 100);
                    return {
                      ...row,
                      [event.colDef.field]: event.newValue,
                      cost: cost,
                      dollarChange: dollarChange,
                      percentChange: percentChange,
                    };
                  }
                  return { ...row, [event.colDef.field]: event.newValue };
                }
                return row;
              })
            );
          }}
        />
      </div>
    </>
  );
}
