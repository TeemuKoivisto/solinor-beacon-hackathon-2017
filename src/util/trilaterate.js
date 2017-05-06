var sqr = function (a) {
  return Math.pow(a, 2);
};

var vector = function (x, y) {
  return {
    x: x,
    y: y
  };
};

export default function(beacons) {
  var j, k, x, y;
  if (beacons.length < 3) {
    console.error("Error! Please add at least three beacons!");
    return vector(0, 0);
  }
  const y0Divy1 = beacons[0].y - beacons[1].y || 0.1;
  const y0Divy2 = beacons[0].y - beacons[2].y || 0.1;
  const y1Divy2 = beacons[1].y - beacons[2].y || 0.1;
  k = (sqr(beacons[0].x) + sqr(beacons[0].y) - sqr(beacons[1].x) - sqr(beacons[1].y) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / 
    (2 * (beacons[0].y - beacons[1].y)) - (sqr(beacons[0].x) + sqr(beacons[0].y) - sqr(beacons[2].x) - sqr(beacons[2].y) - sqr(beacons[0].distance) + sqr(beacons[2].distance)) / 
    (2 * y1Divy2);
  j = (beacons[2].x - beacons[0].x) / (y0Divy2) - (beacons[1].x - beacons[0].x) / y0Divy1;
  x = k / j;
  y = ((beacons[1].x - beacons[0].x) / (y0Divy1)) * x + (sqr(beacons[0].x) + sqr(beacons[0].y) - sqr(beacons[1].x) - sqr(beacons[1].y) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / (2 * (y0Divy1));
  console.log('k ' + k + ' j ' + j + ' x ' + x + ' y ' + y);
  return vector(x, y);
}