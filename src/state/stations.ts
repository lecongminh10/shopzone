import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { getLocation } from "zmp-sdk/apis";
import { requestWithFallback } from "@/utils/request";
import { Location, Station } from "@/types";
import { calculateDistance } from "@/utils/location";
import { formatDistant } from "@/utils/format";

export const stationsState = atom(async () => {
  let location: Location | undefined;
  try {
    const { token } = await getLocation({});
    // TODO: Decode token at server-side to get location
    // https://mini.zalo.me/documents/api/getLocation/
    // location = await decodeToken(token);
  } catch (error) {
    console.warn('Failed to get location:', error);
  }

  const stations = await requestWithFallback<Station[]>("/stations", []);
  const stationsWithDistance = stations.map((station) => ({
    ...station,
    distance: location
      ? formatDistant(
          calculateDistance(
            location.lat,
            location.lng,
            station.location.lat,
            station.location.lng
          )
        )
      : undefined,
  }));

  return stationsWithDistance;
});

export const selectedStationIndexState = atom(0);

export const selectedStationState = atom(async (get) => {
  const index = get(selectedStationIndexState);
  const stations = await get(stationsState);
  return stations[index];
});

