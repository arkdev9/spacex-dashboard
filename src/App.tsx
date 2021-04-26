import { Box, Container, Divider } from "@material-ui/core";
import { ReactComponent as SpaceX } from "./assets/spacex.svg";

import LaunchTable from "./components/LaunchTable";

export default function App() {
  return (
    <Container>
      <SpaceX />
      <Box mt={3} mb={3}>
        <Divider />
      </Box>
      <LaunchTable />
    </Container>
  );
}
