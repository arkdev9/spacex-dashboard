import { FC, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";

import DatePicker from "./DatePicker";
import { DateRange } from "materialui-daterange-picker";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Filters: FC = (props) => {
  const [pickingDate, setPickingDate] = useState(false);
  const toggle = () => setPickingDate(!pickingDate);

  // Calculate 6 months ago as 180 days ago, set default start date
  let sixMonthsAgo = new Date();
  sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: sixMonthsAgo,
    endDate: new Date(),
  });

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
      <DatePicker open={pickingDate} toggle={toggle} />
    </Box>
  );
};

export default Filters;
