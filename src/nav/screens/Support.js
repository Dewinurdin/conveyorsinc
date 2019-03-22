import React from 'react'
import { Dimensions, Image, View, Text, StyleSheet, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../../assets/Conveyors-Logo.png'
import conveyorsinc from '../../assets/Conveyors-inc.png'

import colors from '../../styles/colors'

const { width } = Dimensions.get('window')

class Support extends React.Component {
  static navigationOptions = {
    title: 'Support'
  }

  // onPressCall() {
    // const url = 'telprompt:18176925536';
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (supported) {
  //         return Linking.openURL(url)
  //         console.log(url)
  //           .catch(() => null);
  //       }
  //     });
  // }
  // componentDidMount() {
    // const url = 'telprompt:18176925536';
  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       console.log('Initial url is: ' + url);
  //     }
  //   }).catch(err => console.error('An error occurred', err));
  // }
  // // Cancel Call
  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this._handleOpenURL);
  // }

  // _handleOpenURL(event) {
  //   console.log(event.url);
  // }

  // onPressCall = () => {
  //   const url = 'telprompt:18176925536';
  //   Linking.canOpenURL(url)
  //   .then((supported) => {
  //     if (!supported) {
  //       console.log("Can't handle url: " + url);
  //     } else {
  //       return Linking.openURL(url);
  //     }
  //   })
  // .catch((err) => console.error('An error occurred', err));
  // }

  // onPressEmail = () => {
  //   const url = 'telprompt:18176925536';
  //   Linking.canOpenURL(url)
  //   .then((supported) => {
  //     if (!supported) {
  //       console.log("Can't handle url: " + url);
  //     } else {
  //       return Linking.openURL(url);
  //     }
  //   })
  // .catch((err) => console.error('An error occurred', err));
  // }

  // _pressCall=()=>{
  //   const url='tel://18176925536'
  //   Linking.openURL(url)
  // }

  render() {
    return (
    <View style={styles.mainContainer}>
      <View style={[styles.header, styles.container]}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={logo} 
        />
        <Image
          style={styles.conveyorsinc}
          resizeMode='contain'
          source={conveyorsinc} 
        />
        <Text style={[styles.text, styles.address]}>620 S. Fourth Ave.</Text>
        <Text style={[styles.text, styles.address]}>Mansfield, TX 76063</Text>

        </View>

        <View style={[ styles.container, styles.bodyContainer, styles.call ]}>
          <Icon name="phone-square" size={40} style={styles.icon}/>
          <Text style={styles.text} onPress={this.onPressCall}>817.473.4645</Text>
        </View>

        <View style={[ styles.container, styles.bodyContainer, styles.email ]}>
          <Icon name="envelope" size={40} style={styles.icon}/>
          <Text style={styles.text} onPress={this.onPressEmail}>sales@conveyorsinc.net</Text>
        </View>

        {/* <View style={[ styles.bodyContainer, styles.address ]}>
          <Icon name="building" size={40} style={styles.icon}/>
          <Text style={styles.text}>620 S. Fourth Ave.</Text>
          <Text style={styles.text}>Mansfield, TX 76063</Text>
        </View> */}

    </View>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightGreyBackground,
    padding: 15,
  },
  container: {
    marginBottom: 8,
  },
  header: {
    flex: 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    height: width / 2.75,
  },
  conveyorsinc: {
    height: width / 7,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: 6,
    borderRadius: 10,
    // shadowColor: 'black', 
    // borderBottomWidth: 2,
    shadowColor: '#f5f5f5', 
    // shadowWidth: 10
  },
  call: {
    flex: 1,

  },
  email: {
    flex: 1,
  },
  address: {
    fontWeight: '500',
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
  },
  icon: {
    marginBottom: 10,
    color: colors.blueLogo,
  }
  
})

export default Support