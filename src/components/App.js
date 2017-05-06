import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import { View, StatusBar } from 'react-native'
// import NavigationRouter from '../Navigation/NavigationRouter'
// import { connect } from 'react-redux'
// import StartupActions from '../Redux/StartupRedux'
// import ReduxPersist from '../Config/ReduxPersist'

// Styles
// import styles from './Styles/RootContainerStyles'

import BeaconContainer from './Beacon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends Component {

  componentDidMount () {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          penispenispenissdfadf
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <BeaconContainer />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup())
// })

// export default connect(null, mapDispatchToProps)(RootContainer)