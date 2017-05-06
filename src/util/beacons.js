export function joinBeaconCoords(threeBeacons, hardCodedBeacons) {
  return threeBeacons.map(beacon => {
    const index = findByMajorAndMinor(hardCodedBeacons, beacon);
    if (index !== -1) {
      return Object.assign({}, beacon, hardCodedBeacons[index]);
    } else {
      return undefined;
    }
  })
}

function findByMajorAndMinor(arr1, item) {
  return arr1.findIndex((current) => current.major === item.major && current.minor === item.minor);
}