import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import store from '../store';
import trilaterate from '../util/trilaterate';
import { joinBeaconCoords } from '../util/beacons';

function init() {
  Beacons.detectIBeacons();
}

function beaconsDetected(data) {
  console.log("beacons: ", data.beacons);
  store.dispatch(saveBeacons(data.beacons));
  setTimeout(() => {
    store.dispatch(saveLocation());
  }, 500);
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

export const postLocation = (team, x, y) => (
  {
    type: "LOCATION_POST_ONE",
    payload: {
      request: {
        url: 'http://keisari.herokuapp.com/loc',
        method: 'post',
        data: {
          user: team,
          x,
          y
        }
      }
    }
  }
)

export const saveBeacons = (beacons) => (
  {
    type: "BEACON_GET_ALL_SUCCESS",
    payload: beacons
  }
)

export const saveLocation = () => {
  return (dispatch, getState) => {
    console.log("HEIEIEIEIEI");
    const beacons = getState().get("beacon").get("beacons").toJS().slice(0, 3);
    const hardCodedBeacons = getState().get("beacon").get("hardCodedBeacons").toJS();
    const beaconsWithCoords = joinBeaconCoords(beacons.slice(0, 3), hardCodedBeacons);

    console.log(beacons)
    console.log(beaconsWithCoords)
    if (beaconsWithCoords[0] && beaconsWithCoords[1] && beaconsWithCoords[2]) {
      const myLocation = trilaterate(beaconsWithCoords);
      console.log(myLocation)
      return dispatch(postLocation('tuhatpäkki', myLocation.x, myLocation.y));
    }
  }
}

export const scanBeacons = () => {
  return (dispatch, getState) => {
    init();
    detectBeacons();
    return Promise.resolve();
  };
}
