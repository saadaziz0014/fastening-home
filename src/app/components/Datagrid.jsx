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

export default function Datagrid({ data, columns }) {
  console.log(data, "data");
  const [rowData, setRowData] = useState([...data]);
  const [columnData, setColumnData] = useState(columns);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");
  useEffect(() => {
    setRowData(data);
  }, [data]);
  // const [columnDefs, setColumnDefs] = useState([
  //   { field: "make", sortable: true, filter: true },
  //   { field: "model", sortable: true, filter: true },
  //   { field: "price", sortable: true, filter: true },
  // ]);

  // // Initial row data
  // const [rowData, setRowData] = useState([
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 },
  // ]);
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

    // Update column definitions
    setColumnData((prev) => [...prev, newColumn]);

    // Update row data with empty values for new column
    setRowData((prev) =>
      prev.map((row) => ({
        ...row,
        [newColumn.field]: "",
      }))
    );

    // Reset input
    setNewColumnName("");
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

          <button
            onClick={addColumn}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
          paginationPageSize={10}
          onCellValueChanged={(event) => {
            console.log(event);
            setRowData((prev) => {
              const newData = prev.map((item) => {
                if (item.id === event.data.id) {
                  return { ...item, [event.colDef.field]: event.newValue };
                }
                return item;
              });
              return newData;
            });
          }}
        />
      </div>
    </>
  );
}
