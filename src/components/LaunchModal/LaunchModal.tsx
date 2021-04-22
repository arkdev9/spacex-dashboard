import React from "react";

import { Modal, Box, Typography } from "@material-ui/core";
import ModalHeader from "./ModalHeader";

import useModalStyles from "../../styles/LaunchModal";

export default function LaunchModal(props: any) {
  const modalClasses = useModalStyles();

  return (
    <Modal
      open={props.modalOpen}
      onClose={() => props.setModalOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={modalClasses.paper}>
        {props.selectedLaunch !== undefined && (
          <ModalHeader selectedLaunch={props.selectedLaunch} />
        )}
      </Box>
    </Modal>
  );
}
