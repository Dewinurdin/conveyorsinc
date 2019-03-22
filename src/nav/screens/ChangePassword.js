import React from 'react'
import { Dimensions, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import { Auth } from 'aws-amplify'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Input, Notification } from '../../components/'
import colors from '../../styles/colors'

const { width } = Dimensions.get('window')

class ChangePassword extends React.Component {
  static navigationOptions = {
    title: 'Change Password'
  }
    state = {
      oldPassword: '',
      newPassword: '',
      currentUser: '',
      userEmail: '',
      displayError: false,
      message: '',
    }
    onChangeText = (key, value) => {
      this.setState({ [key]: value })
    }
    // signIn = async () => {
    //   const { username, password } = this.state
    //   try {
    //     await Auth.signIn(username, password)
    //     console.log('successfully signed in')
    //     this.props.navigation.navigate('MainNav')
    //   } catch (err) {
    //     this.setState({ displayError: true })
    //     console.log('error signing up...', err)
    //   }
    // }
    
    handleChangePassword = async () => {
      const { oldPassword, newPassword, currentUser, userEmail } = this.state
      Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(user, oldPassword, newPassword );
          console.log(user)
          console.log(oldPassword)
          console.log(newPassword)
        })
        .then(data => console.log(data))
        .catch((err) => {
          this.setState({ displayError: true, message: err.message })
          console.log("Error: ", err.message)
        })
      }

    handleCloseNotification = () => {
      this.setState({ displayError: false });
    }
    
  render() {
    const { oldPassword, newPassword, displayError, message } = this.state
    // console.log('SettingsScreen State: ', this.state)
    
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TextInput
            type='oldPassword'
            placeholder='Recent Password'
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            placeholderTextColor='#1565c0'
            selectionColor={'#1565c0'}      
            secureTextEntry
            onChangeText={this.onChangeText}
          />
          <TextInput
            onChangeText={this.onChangeText}
            type='newPassword'
            placeholder='New Password'
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            placeholderTextColor='#1565c0'
            selectionColor={'#1565c0'}      
            secureTextEntry
            onChangeText={this.onChangeText}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleChangePassword}

          >
            <Text style={styles.buttontext}> Submit </Text>
          </TouchableOpacity>
        </View>

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
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightGreyBackground,
  },
  container: {
    flex: 2
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 5,
    height: 45,
    width: width - 20,
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: colors.blueText,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4169E1',
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    width: width - 20,
    height: 50,
  },
  buttontext: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '500',
    padding: 6,
    alignItems: 'center',
  }
  
})

export default ChangePassword