import { FC, useEffect, useState } from "react";

import { Modal, Box } from "@material-ui/core";
import ModalHeader from "./ModalHeader";

import useModalStyles from "../../styles/LaunchModal";
import { getOneLaunch, MissionData } from "../../utils/data";

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: Function;
  selectedLaunch: MissionData;
};

const LaunchModal: FC<ModalProps> = (props) => {
  const modalClasses = useModalStyles();
  const [missionData, setMissionData] = useState<MissionData>();

  useEffect(() => {
    const fetchData = async () => {
      setMissionData(await getOneLaunch(props.selectedLaunch.id.toString()));
    };
    fetchData();
  });

  return (
    <Modal
      open={props.modalOpen}
      onClose={() => props.setModalOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={modalClasses.paper}>
        {missionData !== undefined && <ModalHeader missionData={missionData} />}
      </Box>
    </Modal>
  );
};

export default LaunchModal;
