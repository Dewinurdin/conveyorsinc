import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'

class SignOut extends React.Component {
  static navigationOptions = {
    title: 'Sign Out'
  }
  signOut = async () => {
    try {
      await Auth.signOut()
      this.props.navigation.navigate('Auth')
    } catch (err) {
      console.log('error signing out...', err)
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.signOut} 
          style={styles.signoutbutton}>Sign Out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  signoutbutton: {
    backgroundColor: '#4169E1'
  }
})

export default SignOut