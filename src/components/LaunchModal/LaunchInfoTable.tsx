import { FC } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import { LaunchDetails } from "../../utils/data";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 16,
  },
});

type Props = {
  launchDetails: LaunchDetails;
};

const LaunchInfoTable: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Flight Number
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.flight_number}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Mission Name
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.mission_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Rocket Type
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.rocket.type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Manufacturer
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.payload.manufacturer}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Nationality
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.payload.nationality}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Launch Date
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.launch_date.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Payload Type
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.payload.type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Orbit
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.payload.orbit}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Launch Site
            </TableCell>
            <TableCell component="th" scope="row">
              {props.launchDetails.launch_site}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LaunchInfoTable;
