import React, { Fragment, Component } from 'react'
import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { Input, ActionButton, Notification } from '../../components'
import { Auth } from 'aws-amplify'
import colors from '../../styles/colors'

class SignUp extends Component {
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
    // dialCode: '+1',
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signUp = async () => {
  //   Auth.signUp({
  //     'username': 'jdoe',
  //     'password': 'mysecurerandompassword#123',
  //     'attributes': {
  //         'email': 'me@domain.com',
  //         'phone_number': '+12128601234', // E.164 number convention
  //         'given_name': 'Jane',
  //         'family_name': 'Doe',
  //         'nickname': 'Jane'
  //     }
  // });
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

  handleCloseNotification = () => { this.setState({ displayError: false }); }

  render() {
    const { message, displayError } = this.state

    return (
            <View style={styles.container}>
              {
                this.state.stage === Number(0) && (
                  <Fragment>
                    <Input
                      placeholder='First Name'
                      type='given_name'
                      onChangeText={this.onChangeText}
                    />
                    <Input
                      placeholder='Last Name'
                      type='family_name'
                      onChangeText={this.onChangeText}
                    />
                    <Input
                      placeholder='Username'
                      type='username'
                      onChangeText={this.onChangeText}
                    />
                    <Input
                      placeholder='Password'
                      type='password'
                      onChangeText={this.onChangeText}
                      secureTextEntry
                    />
                    <Input
                      placeholder='Email'
                      type='email'
                      onChangeText={this.onChangeText}
                    />
                    <ActionButton
                      title='Sign Up'
                      onPress={this.signUp}
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
                    <Fragment>
                      <Text style={styles.bottomMessage}>Already signed up? <Text
                      style={styles.bottomMessageHighlight}  onPress={this.toggleAuthType}>&nbsp;&nbsp;Sign In</Text>
                      </Text>
                    </Fragment>


                  </Fragment>
                )
              }
              {
                this.state.stage === Number(1) && (
                  <Fragment>
                    <Input
                      placeholder='Confirmation Code'
                      type='authCode'
                      onChangeText={this.onChangeText}
                    />
                    <Notification 
                      message="Please check your email for Confirmation Code"
                      style={styles.notificationContainer}
                      handleCloseNotification={this.handleCloseNotification}
                    />

                    <ActionButton
                      title='Confirm Sign Up'
                      onPress={this.confirmSignUp}
                    />
                  </Fragment>
                )
              }
            </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    textAlign: 'center',
    // marginBottom: 10,
    paddingBottom: 10,
  },
  bottomMessageHighlight: {
    color: colors.blueText,
    fontSize: 17,
    paddingLeft: 10
  }
})

export default SignUp