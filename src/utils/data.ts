import axios, { AxiosResponse } from "axios";

export interface MissionData {
  id: number;
  launched: Date;
  location: string;
  mission: string;
  orbit: string;
  launchState: string;
  rocket: string;
}

export async function getAllLaunches(): Promise<Array<MissionData>> {
  const loadedResp: AxiosResponse = await axios.get(
    "https://api.spacexdata.com/v3/launches"
  );

  if (loadedResp.status === 200) {
    const data: MissionData[] = loadedResp.data.map((launch: any) => ({
      id: launch.flight_number,
      launched: new Date(launch.launch_date_utc),
      location: launch.site_name,
      mission: launch.mission_name,
      orbit: launch.rocket.second_stage.payloads[0].orbit,
      launchState: launch.upcoming
        ? "Upcoming"
        : launch.launch_success
        ? "Success"
        : "Failed",
      rocket: launch.rocket.rocket_name,
    }));
    return data;
  } else {
    // Preferably propagate this error to client
    console.log({
      message: "Couldn't get the launches",
      reason: loadedResp.statusText,
    });
    return [];
  }
}
