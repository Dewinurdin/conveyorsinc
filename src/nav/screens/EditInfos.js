import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class EditInfos extends React.Component {
  static navigationOptions = {
    title: 'Password'
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Edit Infos SCREEN</Text>
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

export default EditInfos