import React, { Fragment, Component } from 'react'
import { Keyboard, KeyboardAvoidingView, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { Input, ActionButton, Notification } from '../../components'
import { Auth } from 'aws-amplify'

// TO DO RESEND AUTH CODE!!!

class ForgotPassword extends Component {
  static navigationOptions = {
    title: 'Create a New Password',
  }
  state = {
    username: '',
    code: '',
    new_password: '',
    message: '',
    errorStage1: false,
    errorStage2: false,
    stage: 0,
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
    
  forgetPassword = async () => {
    const { username } = this.state
    try {
      await Auth.forgotPassword(username)
      console.log('Forget Password request Submitted')
      this.setState({ stage: 1 })
    } catch (err){
      console.log('Error Submitting Request: ', err)
      this.setState({ message: err.message, errorStage1: true })
    }
  }
    
  confirmPasswordReset = async () => {
  // Collect confirmation code and new password , then
    const { username, code, new_password } = this.state;
    try {
      await Auth.forgotPasswordSubmit(username, code, new_password)
      this.props.toggleAuthType()
      console.log("Sucessfully Confirm Password Reset")
      this.setState({ errorStage1: false })
    } catch (err) {
      console.log('Error Resetting Password: ', err)
      this.setState({ errorStage2: true, message: err.message})
    }
  }
  // TO DO FIX ERROR NOTIFICATIONS BASED ON STATE
  handleCloseNotification = () => {
    this.setState({ errorStage1: false, errorStage2: false });
  }

  render() {
    const { message, errorStage1, errorStage2 } = this.state

    return (
      <SafeAreaView >
        <KeyboardAvoidingView behavior='padding' enabled>
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.container}>
            {/* STAGE ONE: SUBMIT USERNAME */}
              {
                this.state.stage === Number(0) && (
                  <Fragment>
                    <Input
                      placeholder='Username'
                      type='username'
                      onChangeText={this.onChangeText}
                    />
                    {
                      errorStage1 === true ?
                      <Notification 
                        type="Error"
                        message={message}
                        handleCloseNotification={this.handleCloseNotification}
                      />
                      : null
                    }

                    <ActionButton
                      title='Submit'
                      onPress={this.forgetPassword}
                    />
                  </Fragment>
                )
              }
            {/* STAGE 2 */}
              {
                this.state.stage === Number(1) && 
                (
                  <Fragment>
                    <Input
                      placeholder='Confirmation Code'
                      type='code'
                      onChangeText={this.onChangeText}
                    />
                    <Input
                      placeholder='New Password'
                      type='new_password'
                      secureTextEntry
                      onChangeText={this.onChangeText}
                    />

                    <Notification 
                      message="Please check your email for Confirmation Code"
                      style={styles.notificationContainer}
                      handleCloseNotification={this.handleCloseNotification}
                    />

                    <ActionButton
                      title='Reset Password'
                      onPress={this.confirmPasswordReset}
                      secureTextEntry
                    />
                    {
                      errorStage2 === true ?
                      <Notification 
                        type="Error"
                        message={message}
                        handleCloseNotification={this.handleCloseNotification}
                      />
                      : null
                    }
                  </Fragment>
                )
              }
            </View>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ForgotPassword