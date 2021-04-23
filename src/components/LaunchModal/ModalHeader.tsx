import { FC } from "react";
import {
  makeStyles,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { LaunchDetails } from "../../utils/data";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

type Props = {
  launchDetails: LaunchDetails;
};

const ModalHeader: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={props.launchDetails.links.mission_patch_link}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.launchDetails.mission_name}{" "}
            <Chip
              label={props.launchDetails.launch_state}
              color={
                props.launchDetails.launch_state === "Upcoming"
                  ? "default"
                  : props.launchDetails.launch_state === "Success"
                  ? "primary"
                  : "secondary"
              }
            />
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.launchDetails.rocket.name}
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <IconButton>
                <MenuBookIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default ModalHeader;
