import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class PrivacyPolicy extends React.Component {
  static navigationOptions = {
    title: 'Password'
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Privacy Policy SCREEN</Text>
        <Text onPress={() => this.props.navigation.navigate('Settings')}>Back to Home Screen</Text>
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
  }
})

export default PrivacyPolicy