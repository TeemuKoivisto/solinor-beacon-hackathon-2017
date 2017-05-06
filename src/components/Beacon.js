import React from 'react';

class BeaconContainer extends React.Component {

  componentDidMount() {
    this.props.scanBeacons();
  }

  render() {
    return (
      <div>
        <h1>BEACONS OH YEAH</h1>
      </div>
    )
  }
}

import { connect } from 'react-redux'

import { scanBeacons } from "../actions/beacon";

const mapDispatchToProps = (dispatch) => ({
  scanBeacons() {
    dispatch(scanBeacons());
  },
})

const mapStateToProps = (state) => {
  const beacon_r = state.get("beacon");
  return {
    beacons: beacon_r.get("beacons").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconContainer);