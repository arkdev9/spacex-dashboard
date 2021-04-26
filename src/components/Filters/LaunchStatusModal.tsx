import { FC, useState } from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";

type Props = {
  open: boolean;
  toggle: () => void;
  filterByLaunchStatus: (status: string) => void;
};

const LaunchStatusModal: FC<Props> = (props) => {
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    status: string
  ) => {
    props.filterByLaunchStatus(status);
    props.toggle();
  };

  return (
    <Box
      display={props.open ? "flex" : "none"}
      flexDirection="row"
      justifyContent="flex-end"
    >
      <List component="nav" aria-label="select launch status filter">
        {["All", "Upcoming", "Failed", "Success"].map((status) => (
          <ListItem
            key={status}
            button
            onClick={(event) => handleListItemClick(event, status)}
          >
            <ListItemText primary={status} style={{ textAlign: "right" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LaunchStatusModal;
