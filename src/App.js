import React from 'react'
import { createSwitchNavigator, createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation'

import { Auth as AmplifyAuth } from 'aws-amplify'
import { API, graphql, Hub, graphqlOperation } from 'aws-amplify'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider as Provider } from 'react-apollo';
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

import { getUser } from './graphql/queries'
import { registerUser } from './graphql/mutations'
import SignIn from '../src/nav/auth/SignIn'
import SignUp from '../src/nav/auth/SignUp'
import ForgetPassword from '../src/nav/auth/ForgetPassword'
import Auth from './nav/auth/Auth'
import Initializing from './nav/screens/Initializing'
import MainNav from './nav/MainNav'
import { UserContext } from './context/userContext'

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
  state = {
    user: null
  }
  componentDidMount(){
    this.getUserData()
    Hub.listen('auth', this, "onHubCapsule")
  }

  getUserData = async () => {
    const user = await AmplifyAuth.currentAuthenticatedUser()
    user ? this.setState({ user }) : this.setState({ user: null })
  }

  onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case 'signIn' :
        console.log("Signed in...")
        this.getUserData();
        this.registerNewUser(capsule.payload.data);
        break;
      case 'signUp' :
        console.log("Sign Up...")
        break;
      case 'signOut' :
        console.log("Signed Out...")
        this.setState({ user: null })
        break;
      default:
        return;
    }
  }

  registerNewUser = async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    }
    const { data} = await API.graphql(graphqlOperation(getUser, getUserInput))
    // if the user hasn't been registered before
    if (!data.getUser){
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        }
        const newUser = await API.graphql(graphqlOperation(registerUser, { input: registerUserInput }))
        console.log(newUser)
      }
      catch (err) {
        console.error("Error Registering new user: ", err)
      }
    }
  }

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
    const { user } = this.state;

    const client = new AWSAppSyncClient({
      url: awsconfig.aws_appsync_graphqlEndpoint,
      region: awsconfig.aws_appsync_graphqlEndpoint,
      auth: {
        type: awsconfig.aws_appsync_authenticationType,
        jwtToken: async () => ( await AmplifyAuth.currentSession() ).idToken.jwtToken
      }
    });
    
    return (
      <UserContext.Provider value={{ user }}>
        <Provider client={client}>
          <Rehydrated>
            <Nav ref={nav => this.navigator = nav}
              onNavigationStateChange={this.checkAuth}
            />
          </Rehydrated>
        </Provider>
      </UserContext.Provider>
    )
  }
}

export default App
