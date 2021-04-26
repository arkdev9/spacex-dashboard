import { FC, useEffect, useState } from "react";

import { Modal, Box, Typography, Link } from "@material-ui/core";
import ModalHeader from "./ModalHeader";
import LaunchInfoTable from "./LaunchInfoTable";

import useModalStyles from "../../styles/LaunchModal";
import { getOneLaunch, LaunchDetails, MissionData } from "../../utils/data";

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: Function;
  selectedLaunch: MissionData;
};

const LaunchModal: FC<ModalProps> = (props) => {
  const modalClasses = useModalStyles();
  const [launchDetails, setLaunchDetails] = useState<LaunchDetails>();

  useEffect(() => {
    const fetchData = async () => {
      setLaunchDetails(await getOneLaunch(props.selectedLaunch.id.toString()));
    };
    fetchData();
  }, [props.selectedLaunch.id]);

  return (
    <Modal
      open={props.modalOpen}
      onClose={() => props.setModalOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ outline: "none" }}
    >
      <Box className={modalClasses.paper}>
        {launchDetails !== undefined && (
          <>
            <ModalHeader launchDetails={launchDetails} />
            <Typography>
              {launchDetails.details || <i>No launch details found.</i>}{" "}
              <Link href={launchDetails.links.wikipedia}>Wikipedia</Link>
            </Typography>
            <LaunchInfoTable launchDetails={launchDetails} />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default LaunchModal;
