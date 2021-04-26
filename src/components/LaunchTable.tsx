import { useState, useEffect, FC } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { DataGrid, ColDef, CellParams } from "@material-ui/data-grid";
import { Box, Chip, Typography } from "@material-ui/core";

import { getAllLaunches, MissionData } from "../utils/data";
import {
  getFilteredRowsByDate,
  getFilteredRowsByLaunchStatus,
} from "../utils/filters";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const LaunchTable: FC = (props) => {
  const history = useHistory();
  const query = useQuery();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(new Array<MissionData>());

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRange>();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState<MissionData>();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("status", statusFilter);
    params.append("dateRange", JSON.stringify(dateRangeFilter));
    history.push({ search: params.toString() });
  }, [statusFilter, dateRangeFilter, history]);

  // Load Data Inital
  useEffect(() => {
    async function loadData() {
      const allLaunches = await getAllLaunches();
      setData(allLaunches);
      setLoading(false);
      if (query.get("status")) {
        setStatusFilter(query.get("status")!);
      }
      if (query.get("dateRange") && query.get("dateRange") !== "undefined") {
        const parsed = JSON.parse(query.get("dateRange")!);
        const newObj: DateRange = {
          startDate: new Date(parsed.startDate),
          endDate: new Date(parsed.endDate),
        };
        console.log(newObj);
        setDateRangeFilter(newObj);
      }
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

  // Applying filters
  let filteredRows = new Array<MissionData>();
  filteredRows = getFilteredRowsByDate(data, dateRangeFilter);
  filteredRows = getFilteredRowsByLaunchStatus(filteredRows, statusFilter);

  return (
    <Box width="100%" height={700}>
      <Filters
        filterByDates={filterByDates}
        filterByLaunchStatus={filterByLaunchStatus}
        clearFilters={clearFilters}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoPageSize
        loading={loading}
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
    </Box>
  );
};

export default LaunchTable;
