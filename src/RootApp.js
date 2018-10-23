import React from 'react'
import{ View, Text } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import HomeScreen from './containers/HomeScreen'
import JobScreen from './containers/JobScreen'

const rootStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  JobScreen: {
    screen: JobScreen,
  },
}, {
    initialRouteName: 'HomeScreen',
})

export default rootStack
