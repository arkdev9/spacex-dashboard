import { makeStyles } from "@material-ui/core";

const useModalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  },
}));

export default useModalStyles;
