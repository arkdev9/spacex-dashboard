import { MissionData } from "../utils/data";
import { DateRange } from "materialui-daterange-picker";

export const getFilteredRowsByDate = (
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

export const getFilteredRowsByLaunchStatus = (
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
