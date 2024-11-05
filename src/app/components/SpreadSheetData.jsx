"use client";
import Spreadsheet from "react-spreadsheet";
export default function SpreadSheetData({ data, setData }) {
  return <Spreadsheet data={data} onChange={(data) => setData(data)} />;
}
