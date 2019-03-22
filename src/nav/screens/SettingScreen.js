import React from 'react'
import { Auth } from 'aws-amplify'

import { View, StyleSheet } from 'react-native'
import { ListItem, Image, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  }
    state = {
      currentUser: '',
      userEmail: ''
    }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({ currentUser: user.username })
    this.setState({ userEmail: user.attributes.email })
    // console.log(user.attributes.email)
    // console.log('user:', user)
    // console.log('username:', user.username)
  }
  
  // TO DO - CREATE OnPress Function 
  signOut = async () => {
    try {
      await Auth.signOut()
      this.props.navigation.navigate('Auth')
    } catch (err) {
      console.log('error signing out...', err)
    }
  }
  changePassword = async () => {
    this.props.navigation.navigate('ChangePassword')
  }
  
  render() {
    const { currentUser, userEmail } = this.state
    // console.log('SettingsScreen State: ', this.state)
    
    return (
      <View>
        <ListItem 
          style={styles.listItem}
          title='Username'
          rightSubtitle={currentUser}
        />
        {/* <ListItem 
          style={styles.listItem}
          title='Phone'
          rightSubtitle='214-222-5555'
          chevron
        /> */}
        <ListItem 
          style={styles.listItem}
          title='Email'
          rightSubtitle={
            <View style={styles.subtitleView}>
              <Text style={styles.subtitleText}>{userEmail}</Text>
            </View>
          }
          chevron
        />
        <ListItem 
          style={styles.listItem}
          title='Change Password'
          onPress={this.changePassword}
          chevron
        />
        <ListItem 
          style={styles.listItem}
          title='Terms of Use'
          chevron
        />
        <ListItem 
          style={styles.listItem}
          title='Privacy Policy'
          chevron
        />
        <ListItem 
          style={styles.listItem}
          title='Version'
          rightSubtitle='1.0.0'
        />
        <ListItem 
          style={styles.listItem}
          title='Sign Out'
          onPress={this.signOut} 
          chevron
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    flexDirection: 'row',
  },
  listItem: {
  },
  subtitleView: {
  },
  subtitleText: {
    color: '#616161',
  },
})

export default SettingScreen