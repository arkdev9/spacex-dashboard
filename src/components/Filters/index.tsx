import { FC, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";

import DatePicker from "./DatePicker";
import { DateRange } from "materialui-daterange-picker";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

type Props = {
  filterByDates: (dateRange: DateRange) => void;
};

const Filters: FC<Props> = (props) => {
  const [pickingDate, setPickingDate] = useState(false);
  const toggle = () => setPickingDate(!pickingDate);

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
            color="primary"
            startIcon={<FilterListIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setPickingDate(!pickingDate)}
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
    </Box>
  );
};

export default Filters;
