import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { getAllLaunches, MissionData } from "./utils/data";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});
export default function BasicTable() {
  const classes = useStyles();
  const [rows, setRows] = useState(new Array<MissionData>());

  useEffect(() => {
    async function loadData() {
      const data: Array<MissionData> = await getAllLaunches();
      setRows(data);
    }
    loadData();
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No:</TableCell>
            <TableCell align="right">Launched</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Mission</TableCell>
            <TableCell align="right">Orbit</TableCell>
            <TableCell align="right">Launch State</TableCell>
            <TableCell align="right">Rocket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.number}>
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="right">{row.launched.toString()}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.mission}</TableCell>
              <TableCell align="right">{row.orbit}</TableCell>
              <TableCell align="right">{row.launchState}</TableCell>
              <TableCell align="right">{row.rocket}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
