import React, { useState, useEffect } from "react";
import { DataGrid, ColDef, CellParams } from "@material-ui/data-grid";
import { Chip } from "@material-ui/core";
import { getAllLaunches, MissionData } from "../utils/data";

const columns: ColDef[] = [
  { field: "id", headerName: "No:", flex: 0.5 },
  { field: "launched", headerName: "Launched", flex: 1.5 },
  { field: "location", headerName: "Location", flex: 1 },
  { field: "mission", headerName: "Mission", flex: 1 },
  { field: "orbit", headerName: "Orbit", flex: 1 },
  {
    field: "launchState",
    headerName: "Launch Status",
    renderCell: (params: CellParams) => (
      <Chip
        label={params.value}
        color={
          params.value === "Upcoming"
            ? "default"
            : params.value === "Success"
            ? "primary"
            : "secondary"
        }
      />
    ),
    flex: 1,
  },
  { field: "rocket", headerName: "Rocket", flex: 1 },
];

export default function DataTable() {
  const [rows, setRows] = useState(new Array<MissionData>());
  useEffect(() => {
    async function loadData() {
      setRows(await getAllLaunches());
    }
    loadData();
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} autoPageSize />
    </div>
  );
}
