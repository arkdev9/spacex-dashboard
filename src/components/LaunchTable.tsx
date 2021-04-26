import { useState, useEffect, FC } from "react";
import { DataGrid, ColDef, CellParams } from "@material-ui/data-grid";
import { Chip, Typography } from "@material-ui/core";

import { getAllLaunches, MissionData } from "../utils/data";
import { DateRange } from "materialui-daterange-picker";

import LaunchModal from "./LaunchModal/LaunchModal";
import Filters from "./Filters";

const columns: ColDef[] = [
  {
    field: "id",
    headerName: "No:",
    flex: 0.5,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
  },
  {
    field: "launched",
    headerName: "Launched",
    renderCell: (params: CellParams) => (
      <Typography>{params.value?.toLocaleString()}</Typography>
    ),
    flex: 1.5,
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
  },
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
    sortable: false,
    hideSortIcons: true,
    disableColumnMenu: true,
  },
  { field: "rocket", headerName: "Rocket", flex: 1 },
];

const LaunchTable: FC = (props) => {
  // `data` will contain the API response
  const [data, setData] = useState(new Array<MissionData>());
  // `rows` will contain a subset of the response with filters applied
  const [rows, setRows] = useState(new Array<MissionData>());

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRange>();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState<MissionData>();

  useEffect(() => {
    async function loadData() {
      const allLaunches = await getAllLaunches();
      setData(allLaunches);
      setRows(allLaunches);
    }
    loadData();
  }, []);

  const filterByDates = (dateRange: DateRange) => {
    setDateRangeFilter(dateRange);
  };
  const filterByLaunchStatus = (status: string) => {
    setStatusFilter(status);
  };
  const clearFilters = () => {
    setDateRangeFilter(undefined);
    setStatusFilter("All");
  };

  const getFilteredRowsByDate = (
    sourceRows: Array<MissionData>,
    dateRange: DateRange | undefined
  ) => {
    if (dateRange === undefined) return sourceRows;

    const filtered = new Array<MissionData>();
    const startTime = dateRange.startDate?.getTime();
    const endTime = dateRange.endDate?.getTime();
    for (const row of sourceRows) {
      const launchTime = row.launched.getTime();
      if (launchTime < endTime! && launchTime > startTime!) {
        filtered.push(row);
      }
    }

    return filtered;
  };

  const getFilteredRowsByLaunchStatus = (
    sourceRows: Array<MissionData>,
    targetStatus: string
  ) => {
    if (targetStatus === "All") return sourceRows;

    const filtered = new Array<MissionData>();
    for (const row of sourceRows) {
      if (row.launchState === targetStatus) {
        filtered.push(row);
      }
    }

    return filtered;
  };

  // Applying filters
  let filteredRows = new Array<MissionData>();
  filteredRows = getFilteredRowsByDate(data, dateRangeFilter);
  filteredRows = getFilteredRowsByLaunchStatus(filteredRows, statusFilter);

  return (
    <div style={{ height: 800, width: "100%" }}>
      <Filters
        filterByDates={filterByDates}
        filterByLaunchStatus={filterByLaunchStatus}
        clearFilters={clearFilters}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoPageSize
        onRowClick={(rowParams) => {
          setSelectedLaunch(filteredRows[(rowParams.row.id as number) - 1]);
          setModalOpen(true);
        }}
      />
      {selectedLaunch !== undefined && (
        <LaunchModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          selectedLaunch={selectedLaunch}
        />
      )}
    </div>
  );
};

export default LaunchTable;
