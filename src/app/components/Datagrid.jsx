"use client";
import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Datagrid({
  data,
  setData,
  columns,
  visibleColumns,
  name,
  addColFlag,
  setAddColFlag,
  search,
}) {
  const [rowData, setRowData] = useState([...data]); // Grid row data
  const [columnData, setColumnData] = useState([]); // Column definitions
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [gridHeight, setGridHeight] = useState(300);
  const gridApiRef = useRef(null);
  const changedCells = useRef(new Set());

  // CSS class rules
  const cellClassRules = {
    "bold-cell": (params) => {
      const cellKey = `${params.node.rowIndex}-${params.colDef.field}`;
      return changedCells.current.has(cellKey); // Bold the cell if it has been changed
    },
  };

  // Default Column Definition
  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    editable: true,
    resizable: true,
    cellClassRules: cellClassRules, // Attach class rules for dynamic styling
    cellStyle: (params) =>
      search &&
      search.length > 2 &&
      params.value?.toString().toLowerCase().includes(search.toLowerCase())
        ? { backgroundColor: "yellow" }
        : {}, // Highlight cells based on search
  };

  // Add a New Column
  const addColumn = () => {
    if (!newColumnName) {
      setAddColFlag(false);
      return;
    }

    const newColumn = {
      field: newColumnName.toLowerCase().replace(/\s+/g, "_"),
      headerName: newColumnName,
      sortable: true,
      filter: true,
      editable: true,
    };

    if (newColumnType === "number") {
      newColumn.filter = "agNumberColumnFilter";
      newColumn.valueParser = (params) => Number(params.newValue);
    } else if (newColumnType === "date") {
      newColumn.filter = "agDateColumnFilter";
      newColumn.valueFormatter = (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "";
    }

    const position = columnData.findIndex(
      (col) => col.field === selectedColumn
    );
    const updatedColumns =
      position >= 0
        ? [
            ...columnData.slice(0, position + 1),
            newColumn,
            ...columnData.slice(position + 1),
          ]
        : [...columnData, newColumn];

    setColumnData(updatedColumns);

    // Add new column with empty values to row data
    setRowData((prev) =>
      prev.map((row) => ({
        ...row,
        [newColumn.field]: "", // Initialize new column with empty values
      }))
    );

    // Update external data
    setData((prev) =>
      prev.map((row) => ({
        ...row,
        [newColumn.field]: "", // Ensure the external state reflects the new column
      }))
    );

    setNewColumnName("");
    setSelectedColumn("");
    setAddColFlag(false);
  };

  // Handle Cell Value Change with Calculations
  const handleCellValueChanged = (event) => {
    const { rowIndex, colDef, data, newValue } = event;
    const field = colDef.field;
    const cellKey = `${rowIndex}-${field}`; // Unique identifier for the cell

    changedCells.current.add(cellKey); // Track the changed cell

    setRowData((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          const updatedRow = { ...row, [field]: newValue };

          // Perform calculations based on the changed field
          if (field === "cost" || field === "newCost") {
            const cost = field === "cost" ? newValue : row.cost;
            const newCost = field === "newCost" ? newValue : row.newCost;

            if (cost && newCost) {
              const dollarChange = newCost - cost;
              const percentChange = Math.round((dollarChange / cost) * 100);
              updatedRow.dollarChange = dollarChange;
              updatedRow.percentChange = percentChange;
            }
          } else if (field === "list" || field === "newList") {
            const list = field === "list" ? newValue : row.list;
            const newList = field === "newList" ? newValue : row.newList;

            if (list && newList) {
              const dollarChangeList = newList - list;
              const percentChangeList = Math.round(
                (dollarChangeList / list) * 100
              );
              updatedRow.dollarChangeList = dollarChangeList;
              updatedRow.percentChangeList = percentChangeList;
            }
          }

          return updatedRow;
        }
        return row;
      })
    );

    // Update external data
    setData((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          const updatedRow = { ...row, [field]: newValue };

          // Perform calculations based on the changed field
          if (field === "cost" || field === "newCost") {
            const cost = field === "cost" ? newValue : row.cost;
            const newCost = field === "newCost" ? newValue : row.newCost;

            if (cost && newCost) {
              const dollarChange = newCost - cost;
              const percentChange = Math.round((dollarChange / cost) * 100);
              updatedRow.dollarChange = dollarChange;
              updatedRow.percentChange = percentChange;
            }
          } else if (field === "list" || field === "newList") {
            const list = field === "list" ? newValue : row.list;
            const newList = field === "newList" ? newValue : row.newList;

            if (list && newList) {
              const dollarChangeList = newList - list;
              const percentChangeList = Math.round(
                (dollarChangeList / list) * 100
              );
              updatedRow.dollarChangeList = dollarChangeList;
              updatedRow.percentChangeList = percentChangeList;
            }
          }

          return updatedRow;
        }
        return row;
      })
    );
    // Refresh the grid to apply styles
    gridApiRef.current.refreshCells();
  };

  useEffect(() => {
    if (visibleColumns) {
      const visibleColumnDefs = columns.filter((col) =>
        visibleColumns.includes(col.field)
      );
      setColumnData(visibleColumnDefs);
    }
  }, [visibleColumns, columns]);

  useEffect(() => {
    setRowData([...data]); // Update grid rows when data prop changes
    const rowHeight = 25; // Default row height
    const headerHeight = 50; // Adjust based on your header size
    const bufferHeight = 20; // Additional padding
    const calculatedHeight =
      data.length * rowHeight + headerHeight + bufferHeight;

    setGridHeight(calculatedHeight < 300 ? 300 : calculatedHeight);
  }, [data]);

  if (!addColFlag) {
    return (
      <>
        <div className={`ag-theme-alpine  w-full`} style={{ height: "80vh" }}>
          <AgGridReact
            onGridReady={(params) => {
              gridApiRef.current = params.api;
            }}
            rowData={rowData}
            columnDefs={columnData}
            defaultColDef={defaultColDef}
            animateRows={true}
            onCellValueChanged={handleCellValueChanged}
            pagination={true}
            paginationPageSize={30}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
        <div className="flex justify-between">
          <div className="flex gap-4 items-end mb-4">
            <div className="flex flex-col">
              <label className="text-sm text-black mb-1">Column Name</label>
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="px-3 py-2 border rounded"
                placeholder="Enter column name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-black mb-1">Column Type</label>
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
              <label className="text-sm text-black mb-1">
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
          {/* <div className="flex items-end mb-4">
            {name && <h1 className="font-bold text-[#614d87]">File: {name}</h1>}
          </div> */}
        </div>
      </div>
    );
  }
}
