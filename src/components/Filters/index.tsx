import { FC, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";

import DatePicker from "./DatePicker";
import LaunchStatusModal from "./LaunchStatusModal";
import { DateRange } from "materialui-daterange-picker";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

type Props = {
  filterByDates: (dateRange: DateRange) => void;
  filterByLaunchStatus: (targetStatus: string) => void;
  clearFilters: () => void;
};

const Filters: FC<Props> = (props) => {
  const [pickingDate, setPickingDate] = useState(false);
  const [pickingLaunchStatus, setPickingLaunchStatus] = useState(false);
  const toggle = () => setPickingDate(!pickingDate);
  const togglePickingLaunchStatus = () =>
    setPickingLaunchStatus(!pickingLaunchStatus);

  return (
    <Box mb={2}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CalendarTodayIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setPickingDate(!pickingDate)}
          >
            Date
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<ClearAllIcon />}
            onClick={() => props.clearFilters()}
          >
            Clear Filters
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FilterListIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setPickingLaunchStatus(!pickingLaunchStatus)}
          >
            Launch Status
          </Button>
        </Grid>
      </Grid>
      <DatePicker
        open={pickingDate}
        toggle={toggle}
        filterByDates={props.filterByDates}
      />
      <LaunchStatusModal
        open={pickingLaunchStatus}
        toggle={togglePickingLaunchStatus}
        filterByLaunchStatus={props.filterByLaunchStatus}
      />
    </Box>
  );
};

export default Filters;
