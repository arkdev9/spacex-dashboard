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

// Details gleaned from API response for a single launch
export interface LaunchDetails {
  flight_number: number;
  mission_name: string;
  mission_id: [string];
  details: string;
  // Create date object from launch_date_utc
  launch_date: Date;
  // API Response -> resp.launch_site.site_name
  launch_site: string;
  launch_state: string;
  rocket: {
    id: string;
    name: string;
    type: string;
  };
  // API Response -> resp.rocket.second_stage.payloads[0]
  payload: {
    id: string;
    type: string;
    nationality: string;
    manufacturer: string;
    orbit: string;
  };
  links: {
    mission_patch_link: string;
    wikipedia: string;
    video_link: string;
  };
}

export async function getAllLaunches(): Promise<Array<MissionData>> {
  const loadedResp: AxiosResponse = await axios.get(
    "https://api.spacexdata.com/v3/launches"
  );

  if (loadedResp.status === 200) {
    const data: MissionData[] = loadedResp.data.map((launch: any) => ({
      id: launch.flight_number,
      launched: new Date(launch.launch_date_utc),
      location: launch.launch_site.site_name,
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

export async function getOneLaunch(launchId: string) {
  const response = await axios.get(
    `https://api.spacexdata.com/v3/launches/${launchId}`
  );
  const data = response.data;
  const payload = data.rocket.second_stage.payloads[0];
  // Create a LaunchDetails typed obj from response
  const launchDetails: LaunchDetails = {
    flight_number: data.flight_number,
    mission_name: data.mission_name,
    mission_id: data.mission_id,
    details: data.details,
    launch_date: new Date(data.launch_date_utc),
    launch_state: data.upcoming
      ? "Upcoming"
      : data.launch_success
      ? "Success"
      : "Failed",
    launch_site: data.launch_site.site_name,
    rocket: {
      id: data.rocket.rocket_id,
      name: data.rocket.rocket_name,
      type: data.rocket.rocket_type,
    },
    payload: {
      id: payload.payload_id,
      nationality: payload.nationality,
      manufacturer: payload.manufacturer,
      type: payload.payload_type,
      orbit: payload.orbit,
    },
    links: {
      mission_patch_link: data.links.mission_patch,
      wikipedia: data.links.wikipedia,
      video_link: data.video_link,
    },
  };
  return launchDetails;
}
