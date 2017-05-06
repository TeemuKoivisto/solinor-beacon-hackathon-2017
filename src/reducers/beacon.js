import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  beacons: [],
});

function findByMajorAndMinor(arr1, item) {
  return arr1.findIndex((current) => current.major === item.major && current.minor === item.minor);
}

function combineArraysByUuid(arr1, arr2) {
  const union = Object.assign([], arr1);
  arr2.forEach((item) => {
    const index = findByMajorAndMinor(union, item);
    if (index === -1) {
      union.push(item);
    } else {
      union[index] = item;
    }
  })
  return union;
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BEACON_GET_ALL_SUCCESS":
      const beacons = combineArraysByUuid(state.get("beacons").toJS(), action.payload);
      const sorted = beacons.sort((a, b) => a.major < b.major ? -1 : 1 );
      return state.mergeIn(["beacons"], fromJS(sorted));
    default:
      return state;
  }
}