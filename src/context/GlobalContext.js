import React, { Component } from 'react';

import UserContext from './userContext';

class GlobalState extends Component {
  state = {
    given_name: '',
    family_name: '',
    username: '',
    email: '',
    password: '',
    phone_number: '',
    authCode: '',
    stage: 0,
    message: '',
    displayError: false,
  };
  
  handleChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
      await Auth.signIn(username, password)
      console.log('successfully signed in')
      this.props.navigation.navigate('MainNav')
    } catch (err) {
      this.setState({ message: err.message, displayError: true })
      console.log('ERROR signing in: ', err)
    }
  }
  handleCloseNotification = () => { this.setState({ displayError: false }); }

  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
      this.setState({ username: user.username })
    } catch (err) {
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      )
    }
  } 
  signUp = async () => {
    const {
      given_name, family_name, username, password, email, phone_number
    } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number, given_name, family_name }})
      console.log('successful sign up..')
      this.setState({ stage: 1 })
    } catch (err) {
      console.log('error signing up...', err)
      this.setState({ message: err.message, displayError: true })
    }
  }
  confirmSignUp = async () => {
    const { username, authCode } = this.state
    console.log(this.state)
    try {
      await Auth.confirmSignUp(username, authCode)
      this.props.toggleAuthType()
    } catch (err) {
      console.log('error signing up...', err)
    }
  }
  authNavigation = () => navigation.navigate('Auth')


  render() {
    return (
      <UserContext.Provider
        value={{
          given_name: this.state.given_name,
          family_name: this.state.family_name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          phone_number: this.state.phone_number,
          authCode: this.state.authCode,
          stage: this.state.stage,
          message: this.state.message,
          displayError: this.state.displayError,
          
          handleChangeText: this.handleChangeText,
          authNavigation: this.authNavigation,
          signIn: this.signIn,
          signUp: this.signUp,
          confirmSignUp: this.confirmSignUp,
          handleCloseNotification: this.handleCloseNotification,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default GlobalState;