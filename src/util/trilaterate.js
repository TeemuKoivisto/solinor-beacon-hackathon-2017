
export default function (beacons) {
  const weight0 = 1 / Math.pow(beacons[0].distance, 2);
  const weight1 = 1 / Math.pow(beacons[1].distance, 2);
  const weight2 = 1 / Math.pow(beacons[2].distance, 2);

  const x = (beacons[0].x * weight0 + beacons[1].x * weight1 + beacons[2].x * weight2) / (weight0 + weight1 + weight2);
  const y = (beacons[0].y * weight0 + beacons[1].y * weight1 + beacons[2].y * weight2) / (weight0 + weight1 + weight2);
  return {
    x,
    y
  }
}