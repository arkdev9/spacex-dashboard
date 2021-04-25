import { useState } from "react";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";

type Props = {
  open: boolean;
  toggle: () => void;
  setDateRange: () => void;
};

const App: React.FunctionComponent<Props> = (props) => {
  return (
    <DateRangePicker
      open={props.open}
      toggle={props.toggle}
      onChange={(range: DateRange) => props.setDateRange(range)}
    />
  );
};

export default App;
