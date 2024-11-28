import React, { useEffect, useState, useRef } from "react";
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

export default function Datagrid({
  data,
  setData,
  columns,
  visibleColumns,
  name,
  search,
}) {
  // console.log(data, "data");
  const [rowData, setRowData] = useState([...data]);
  const [columnData, setColumnData] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");
  const [selectedColumn, setSelectedColumn] = useState("");
  const gridApiRef = useRef(null); // Reference to the grid API

  useEffect(() => {
    setRowData(data);
    if (visibleColumns) {
      let updatedColumns = columns.map((col) => ({
        ...col,
        cellStyle: (params) =>
          search &&
          search.length > 2 &&
          params.value?.toString().toLowerCase().includes(search.toLowerCase())
            ? { backgroundColor: "yellow" }
            : { backgroundColor: "white" }, // Highlight cells containing the search string
      }));

      let visibleColumnDefs = updatedColumns.filter((col) =>
        visibleColumns.includes(col.field)
      );
      setColumnData(visibleColumnDefs);
    }
  }, [visibleColumns, columns, search, data]);

  useEffect(() => {
    // Refresh the cells when the search prop changes
    if (gridApiRef.current) {
      gridApiRef.current.refreshCells({ force: true });
    }
  }, [search]);

  const addColumn = () => {
    if (!newColumnName) return;

    const newColumn = {
      field: newColumnName.toLowerCase().replace(/\s+/g, "_"),
      headerName: newColumnName,
      sortable: true,
      filter: true,
      cellStyle: (params) =>
        search &&
        search.length > 2 &&
        params.value?.toString().toLowerCase().includes(search.toLowerCase())
          ? { backgroundColor: "yellow" }
          : { backgroundColor: "white" }, // Apply the same conditional styling to new columns
    };

    if (newColumnType === "number") {
      newColumn.filter = "agNumberColumnFilter";
      newColumn.valueParser = (params) => Number(params.newValue);
    } else if (newColumnType === "date") {
      newColumn.filter = "agDateColumnFilter";
      newColumn.valueFormatter = (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "";
    }

    let position = columnData.findIndex((col) => col.field === selectedColumn);
    let updatedColumns;
    if (position >= 0) {
      updatedColumns = [
        ...columnData.slice(0, position + 1),
        newColumn,
        ...columnData.slice(position + 1),
      ];
    } else {
      updatedColumns = [...columnData, newColumn];
    }

    setColumnData(updatedColumns);

    setRowData((prev) =>
      prev.map((row) => ({
        ...row,
        [newColumn.field]: "",
      }))
    );

    setData(rowData);

    setNewColumnName("");
    setSelectedColumn("");
  };

  const handleGridReady = (params) => {
    gridApiRef.current = params.api; // Set the grid API reference
  };

  return (
    <>
      <div className="flex justify-between">
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
        <div className="flex items-end mb-4">
          {name && <h1 className="font-bold text-[#614d87]">File: {name}</h1>}
        </div>
      </div>
      <div className="ag-theme-alpine w-full h-[100vh]">
        <AgGridReact
          onGridReady={handleGridReady} // Set the grid API when ready
          rowData={rowData}
          columnDefs={columnData}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={30}
          onCellValueChanged={(event) => {
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
                    setData((prev) =>
                      prev.map((item) => {
                        if (item.id === event.data.id) {
                          return {
                            ...item,
                            cost: event.newValue,
                            newCost: newCost,
                            dollarChange: dollarChange,
                            percentChange: percentChange,
                          };
                        }
                        return item;
                      })
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
                    setData((prev) =>
                      prev.map((item) => {
                        if (item.id === event.data.id) {
                          return {
                            ...item,
                            cost: cost,
                            newCost: event.newValue,
                            dollarChange: dollarChange,
                            percentChange: percentChange,
                          };
                        }
                        return item;
                      })
                    );
                    return {
                      ...row,
                      [event.colDef.field]: event.newValue,
                      cost: cost,
                      dollarChange: dollarChange,
                      percentChange: percentChange,
                    };
                  } else if (event.colDef.field === "newList") {
                    let list = event.data.list;
                    if (!list) {
                      return { ...row, [event.colDef.field]: event.newValue };
                    }
                    let dollarChange = event.newValue - list;
                    let percentChange = Math.round((dollarChange / list) * 100);
                    setData((prev) =>
                      prev.map((item) => {
                        if (item.id === event.data.id) {
                          return {
                            ...item,
                            list: list,
                            newList: event.newValue,
                            dollarChangeList: dollarChange,
                            percentChangeList: percentChange,
                          };
                        }
                        return item;
                      })
                    );
                    return {
                      ...row,
                      [event.colDef.field]: event.newValue,
                      list: list,
                      dollarChangeList: dollarChange,
                      percentChangeList: percentChange,
                    };
                  } else if (event.colDef.field === "list") {
                    let newList = event.data.newList;
                    if (!newList) {
                      return { ...row, [event.colDef.field]: event.newValue };
                    }
                    let dollarChange = newList - event.newValue;
                    let percentChange = Math.round(
                      (dollarChange / newList) * 100
                    );
                    setData((prev) =>
                      prev.map((item) => {
                        if (item.id === event.data.id) {
                          return {
                            ...item,
                            newList: newList,
                            list: event.newValue,
                            dollarChangeList: dollarChange,
                            percentChangeList: percentChange,
                          };
                        }
                        return item;
                      })
                    );
                  } else {
                    setData((prev) =>
                      prev.map((item) => {
                        if (item.id === event.data.id) {
                          return {
                            ...item,
                            [event.colDef.field]: event.newValue,
                          };
                        }
                        return item;
                      })
                    );
                    return { ...row, [event.colDef.field]: event.newValue };
                  }
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
