import React from 'react'
import { createSwitchNavigator, createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation'

import SignIn from '../src/nav/auth/SignIn'
import SignUp from '../src/nav/auth/SignUp'
import ForgetPassword from '../src/nav/auth/ForgetPassword'
import Auth from './nav/auth/Auth'
import Initializing from './nav/screens/Initializing'
import MainNav from './nav/MainNav'

import { Auth as AmplifyAuth } from 'aws-amplify'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider as Provider } from 'react-apollo';
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () => ( await Auth.currentSession() ).idToken.jwtToken
  }
});

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
      <Provider client={client}>
        <Rehydrated>
          <Nav ref={nav => this.navigator = nav}
            onNavigationStateChange={this.checkAuth}
          />
        </Rehydrated>
      </Provider>
    )
  }
}

export default App
