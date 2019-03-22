// MAKE HOME SCREEN PAGE

import React from 'react' 
import { Dimensions, View, Text, ScrollView, StyleSheet, Image } from 'react-native'

import { Auth } from 'aws-amplify'

const { width } = Dimensions.get('window')

import logo from '../../assets/Conveyors-Logo.png'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
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
      <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={logo} 
        />
        <Text style={styles.title}>Conveyor Inc.</Text>
        <Text style={styles.subtitle}>Manufacturer of Bulk Material Handling Equipment Since 1974</Text>
        
        <Text onPress={() => this.props.navigation.navigate('Quote')}>Go to Quote</Text>
        <Text onPress={() => this.props.navigation.navigate('Password')}>Go to Forget Password</Text>

        <Text onPress={this.signOut} 
          style={styles.signoutbutton}>Sign Out</Text>
        
        <Text style={styles.body}>
          Conveyors Incorporated a family owned and operated company was organized in 1974 and has developed over 40 years in to the leader in value added conveying equipment with world class experience. 
          Conveyors Inc., utilizes more than 100,000 square foot of manufacturing space on ten acres in Mansfield, Texas centrally located in the Dallas Fort Worth metroplex.
        </Text>
        
        <Text style={styles.body}>
          Located in the Dallas Fort Worth area allows for convenient shipping to all parts of the United States, North America and worldwide. 
          Conveyors Inc., has become a primary source for material handling equipment in a wide variety of industries including pulp and paper, agriculture, water treatment, rubber, steel, chemicals, aggregates, food processing as well as many others industries.
        </Text>
        <Text style={styles.body}>
          We take pride in offering the highest quality products and services at the most competitive prices. 
          For the majority of 40 years we have developed our business based on customers satisfaction and by "word of mouth" to new customers. Our experienced Sales and Engineering staff are waiting and prepared to help you with all your material handling equipment needs
        </Text>
        {/* <Text onPress={this.signOut}>Sign Out</Text> */}
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
    backgroundColor: 'white'
  },  
  logo: {
    height: width / 3.75,
    marginTop: 10
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  subtitle: {
    fontSize: 17,
    padding: 5,
    fontFamily: 'SourceSansPro-SemiBold',
    textAlign: 'center',
    marginBottom: 15
  },
  body: {
    fontSize: 17,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'justify'
  },
})

export default Home