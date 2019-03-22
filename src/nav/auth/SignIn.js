import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Auth } from 'aws-amplify'

import { Input, ActionButton, Notification } from '../../components'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    displayError: false,
    message: '', 
  }
  onChangeText = (key, value) => {
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

  render() {
    const { message, displayError } = this.state;
    return (
      <View style={styles.container}>
        <Input style={styles.input}
          onChangeText={this.onChangeText}
          type='username'
          placeholder='Username'
        />
        <Input
          onChangeText={this.onChangeText}
          type='password'
          placeholder='Password'
          secureTextEntry
        />
        <ActionButton
          title='Sign In'
          onPress={this.signIn}
        />
        {
          displayError === true ?
          <Notification 
            type="Error"
            message={message}
            handleCloseNotification={this.handleCloseNotification}
          />
          : null
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
})


export default SignIn