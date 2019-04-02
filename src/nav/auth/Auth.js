import React, { Fragment, Component } from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions
} from 'react-native'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgetPassword from './ForgetPassword'
import colors from '../../styles/colors'

const { width } = Dimensions.get('window')

class Auth extends Component {
  state = {
    showSignUp: false,
    showForgetPassword: false,
  }
  toggleAuthType = () => {
    let showSignUp
    this.state.showSignUp ? showSignUp = false : showSignUp = true
    this.setState({ showSignUp, showForgetPassword: false })
  }
  forgetPassword = () => {
    let showForgetPassword
    this.state.showForgetPassword ? showForgetPassword = false : showForgetPassword = true
    this.setState({ showForgetPassword, showSignUp: false })
  }
  render() {
    const { showSignUp, showForgetPassword, showSignIn } = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require("../../assets/Conveyors-Logo.png")}
          />
          <Text style={styles.title}>Conveyor Inc.</Text>
          <Text style={styles.subtitle}>THE LEADER IN VALUE ADDED CONVEYING EQUIPMENT WITH WORLD CLASS EXPERIENCE</Text>
        </View>
        <View style={styles.element}>
        {
          showSignUp ? 
          <SignUp toggleAuthType={this.toggleAuthType} /> 
          : 
          showForgetPassword ?
          <ForgetPassword toggleAuthType={this.toggleAuthType} />
          :
          <SignIn navigation={this.props.navigation} />
        }

        <View style={styles.bottomWrapper}>
          {
            showSignUp ? 
            (
              // <Fragment>
              //   <Text style={styles.bottomMessage}>Already signed up? <Text
              //   style={styles.bottomMessageHighlight}  onPress={this.toggleAuthType}>&nbsp;&nbsp;Sign In</Text>
              //   </Text>
              // </Fragment>
              null
            ) 
            : 
            showForgetPassword ?
            (
              <Fragment>
                <Text style={styles.bottomMessage}>Need an account? 
                  <Text style={styles.bottomMessageHighlight}  onPress={this.toggleAuthType}>&nbsp;&nbsp;Sign Up</Text>
                </Text>
              </Fragment>
            )
            :
            (
              <Fragment>
                <Text style={styles.bottomMessage}>Need an account?
                  <Text onPress={this.toggleAuthType} style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Sign Up</Text>
                </Text>
                <Text style={styles.bottomMessage}>
                  <Text onPress={this.forgetPassword} style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Forget Password</Text>
                </Text>
              </Fragment>
            )
          }
        </View> 
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  header: {
    alignItems: 'center',
  },
  logo: {
    height: width / 3
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'SourceSansPro-Bold',
    color: colors.black,
  },
  subtitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  element: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'center',
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

export default Auth