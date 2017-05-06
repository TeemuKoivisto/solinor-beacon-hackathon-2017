import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

function init() {
  Beacons.detectIBeacons();
}

function beaconsDetected(data) {
  console.log("beacons: ", data.beacons);
}

function detectBeacons() {
  Beacons
  .startRangingBeaconsInRegion('00000000-0000-0000-000000000000')
  .then(() => {
    console.log(`Beacons ranging started succesfully!`)
  })
  .catch(err => {
    console.log(`Beacons ranging not started, error: ${err}`)
  })

  DeviceEventEmitter.addListener('beaconsDidRange', beaconsDetected);
}

function postLocation(x, y) {
  return fetch('http://keisari.herokuapp.com/loc',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: 'tuhatpäkki', x, y })
    })
    .then((res) => {
      console.log("location saved: ", res)
    })
}

init();
detectBeacons();

export default "asdf";