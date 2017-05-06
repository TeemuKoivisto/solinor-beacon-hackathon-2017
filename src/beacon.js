import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

// Tells the library to detect iBeacons
Beacons.detectIBeacons()

// Start detecting all iBeacons in the nearby
try {

  // Beacons.getMonitoredegions().then((stuff) => {
  //   console.log('monitored: ', stuff)
  // })


  // Beacons.getRangedRegions().then((stuff) => {
  //   console.log('ranged: ', stuff)
  // })

  const options = {
    identifier: 'Showroom',
    uuid: '00000000-0000-0000-000000000000'
  }

  Beacons
  .startRangingBeaconsInRegion('00000000-0000-0000-000000000000')
  .then(() => {
    console.log(`Beacons ranging started succesfully!`)

  })

  fetch('http://keisari.herokuapp.com/loc',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: 'tuhatpäkki', x: 20, y: 20 })
  })
  .then((res) => {
    console.log("response: ", res)
  })
} catch (err) {
  console.log(`Beacons ranging not started, error: ${error}`)
}

// Print a log of the detected iBeacons (1 per second)
DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
  // console.log('Found beacons!', data.beacons)
})

console.log('lasdfasfasdf')

export default "asdf";