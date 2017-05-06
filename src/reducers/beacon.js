import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  beacons: [],
  hardCodedBeacons: [
    {
      major: 37,
      minor: 37,
      x: 30,
      y: 30
    },
    {
      major: 12,
      minor: 12,
      x: 30,
      y: 15
    },
    {
      major: 21,
      minor: 21,
      x: 30,
      y: 0
    },
    {
      major: 42,
      minor: 42,
      x: 15,
      y: 30
    },
    {
      major: 36,
      minor: 36,
      x: 15,
      y: 15
    },
    {
      major: 35,
      minor: 35,
      x: 15,
      y: 0
    },
    {
      major: 33,
      minor: 33,
      x: 0,
      y: 0
    },
    {
      major: 34,
      minor: 34,
      x: 0,
      y: 15
    },
    {
      major: 46,
      minor: 46,
      x: 0,
      y: 30
    },
  ]
});

function findIfBeaconIsHardcoded(beacon, arr) {
  return arr.find(b => b.major === beacon.major && b.minor === beacon.minor);
}

function findByMajorAndMinor(beacon, arr) {
  return arr.findIndex((current) => current.major === beacon.major && current.minor === beacon.minor);
}

function combineArraysByUuid(arr1, arr2, hardCoded) {
  const union = Object.assign([], arr1);
  arr2.forEach((item) => {
    const index = findByMajorAndMinor(item, union);
    if (index === -1) {
      const isHardCoded = findIfBeaconIsHardcoded(item, hardCoded);
      if (isHardCoded) {
        union.push(item);
      }
    } else {
      union[index] = item;
    }
  })
  return union;
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BEACON_GET_ALL_SUCCESS":
      const beacons = combineArraysByUuid(state.get("beacons").toJS(),
        action.payload, state.get("hardCodedBeacons").toJS());
      const sorted = beacons.sort((a, b) => a.distance < b.distance ? -1 : 1 );
      return state.mergeIn(["beacons"], fromJS(sorted));
    default:
      return state;
  }
}