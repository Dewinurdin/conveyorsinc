import React from 'react'
import { 
  createStackNavigator, 
  createBottomTabNavigator, 
  createDrawerNavigator } from 'react-navigation'
  import { TouchableOpacity, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import Home from './screens/Home'
import QuoteWithData from './screens/Quote'
import Support from './screens/Support'
import ChangePassword from './screens/ChangePassword'
import SettingScreen from './screens/SettingScreen'
import EditInfos from './screens/EditInfos'
import PrivacyPolicy from './screens/PrivacyPolicy'
import SignOut from '../nav/auth/SignOut'

// Bottom HOME Tab Navigator
const HomeTabNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Quote: { screen: QuoteWithData },
  Support: { screen: Support },
  Settings: SettingScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({

    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home`;
      } else if (routeName === 'Quote') {
        iconName = `forum`;
      } else if (routeName === 'Support') {
        iconName = `phone`;
      } else if (routeName === 'Settings') {
        iconName = 'settings'
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#1e88e5',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 10,
    },
    style: {
      justifyContent: 'center',
      borderTopWidth: 0,
      paddingTop: 10,
      // IoS
      shadowOffset: { width: 5, height: 3},
      shadowColor: 'black',
      shadowOpacity: 0.5,
      // Android
      elevation: 5,
    }
  },
});

// Making the common header title dynamic in AppTabNavigator
HomeTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  return {
    headerTitle,
  }
}

const SettingStackNavigator = createStackNavigator({
  Settings: { screen: SettingScreen },
  // ForgetPassword: { screen: ForgetPassword },
  EditInfos: { screen: EditInfos },
  PrivacyPolicy: { screen: PrivacyPolicy },
  ChangePassword: { screen: ChangePassword },
})

//ROUTES
// Create App Stack and pass it to DrawerNavigator
// So we get a Header 
const AppStackNavigator = createStackNavigator({
  Home: HomeTabNavigator,
  Settings: SettingStackNavigator,
}, 
{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerLeft: 
      <TouchableOpacity>
        <View>
          <Icon name="menu" size={30} 
            style={{ paddingHorizontal: 15 }}
            onPress={() => navigation.openDrawer()}
        />
        </View>
      </TouchableOpacity>
    }
  }
})
// DRAWER NAVIGATOR
const MainNav = createDrawerNavigator({
  Home: { screen: AppStackNavigator },
  Quote: { screen: QuoteWithData },
  Support: { screen: Support },
  Settings: { screen: SettingScreen },
});


export default MainNav