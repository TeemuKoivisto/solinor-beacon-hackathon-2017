import React from 'react';
import { View, Text, ListView } from 'react-native';

import styles from './Beacon.style'

class BeaconContainer extends React.Component {

  constructor() {
    super();
    const rowHasChanged = (r1, r2) => r1 !== r2
    // const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    const dataSource = new ListView.DataSource({ rowHasChanged })
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.props.scanBeacons();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.beacons);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.beacons)
    });
  }

  renderRow (rowData) {
    // You can condition on sectionID (key as string), for different cells
    // in different sections
    return (
      <View style={styles.row}>
        {/*<Text style={styles.boldLabel}>uuid: {rowData.uuid}</Text>*/}
        <Text style={styles.boldLabel}>major: {rowData.major}</Text>
        <Text style={styles.label}>minor: {rowData.minor}</Text>
      </View>
    )
  }

  render() {
    const { beacons } = this.props;
    return (
      <View >
        <Text style={styles.title}>BEACONS OH YEAAAH</Text>
        <ListView
          contentContainerStyle={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
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