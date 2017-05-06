import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import store from '../store';

function init() {
  Beacons.detectIBeacons();
}

function beaconsDetected(data) {
  // console.log("beacons: ", data.beacons);
  store.dispatch(saveBeacons(data.beacons));
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

export const saveBeacons = (beacons) => (
  {
    type: "BEACON_GET_ALL_SUCCESS",
    payload: beacons
  }
)

export const scanBeacons = () => {
  return (dispatch, getState) => {
    init();
    detectBeacons();
    return Promise.resolve();
  };
}
