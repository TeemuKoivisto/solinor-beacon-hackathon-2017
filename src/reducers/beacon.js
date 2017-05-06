import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  beacons: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BEACON_GET_ALL_SUCCESS":
      const sorted = action.payload.sort((a, b) => a.uuid < b.uuid ? -1 : 1 );
      return state.mergeIn(["beacons"], fromJS(sorted));
    default:
      return state;
  }
}