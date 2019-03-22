import React from 'react'
import { createSwitchNavigator, createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation'

import SignIn from '../src/nav/auth/SignIn'
import SignUp from '../src/nav/auth/SignUp'
import ForgetPassword from '../src/nav/auth/ForgetPassword'
import Auth from './nav/auth/Auth'
import Initializing from './nav/screens/Initializing'
import MainNav from './nav/MainNav'

const AuthStackNavigator = createStackNavigator({
  Auth: { screen: Auth },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  ForgetPassword: { screen: ForgetPassword }
});

const SwitchNav = createSwitchNavigator({
  Initializing: { screen: Initializing },
  Auth: { screen: AuthStackNavigator },
  MainNav: { screen: MainNav }
})

const Nav = createAppContainer(SwitchNav)

class App extends React.Component {

  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
    } catch (err) {
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      )
    }
  } 

  render() {
    return (
          <Nav ref={nav => this.navigator = nav}
            onNavigationStateChange={this.checkAuth}
          />
    )
  }
}

export default App
