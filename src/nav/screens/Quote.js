import React from 'react'
import { Dimensions, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Ionicons';

import { Auth as AmplifyAuth } from 'aws-amplify'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider as Provider } from 'react-apollo';

import awsconfig from '../../aws-exports'

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () => ( await Auth.currentSession() ).idToken.jwtToken
  }
});

const { width } = Dimensions.get('window')

class Quote extends React.Component {
  static navigationOptions = {
    title: 'RFQ'
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      // <Provider client={client}>
      //   <Rehydrated>
          <View style={styles.container}>
            <Text style={styles.title}>Please Fill Informations Below</Text>
            
            <Text onPress={() => this.props.navigation.navigate('Support')}>Go to Support</Text>

            <TextInput placeholder='Capacity'
              style={styles.input}
              placeholderTextColor='#90caf9'
              selectionColor={'#1565c0'}
              onChangeText={this.onChangeText}      
            />
            <TextInput placeholder='Angle'
              style={styles.input}
              placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={this.onChangeText}     
              />
              <TextInput placeholder='Length'
                style={styles.input}
                placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={this.onChangeText}      
              />
              <TextInput placeholder='Loading'
                style={styles.input}
                placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={this.onChangeText}
              />
              <TextInput placeholder='Material'
                style={styles.input}
                placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={this.onChangeText}
              />
              <TextInput placeholder='Extra Informations'
                style={styles.extrainfos}
                placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={this.onChangeText}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={this.onPress}
              >
              <Text style={styles.buttontext}> Submit </Text>
            </TouchableOpacity>
        
          </View>
      //   </Rehydrated>
      // </Provider>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  title: {
    fontSize: 23,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  input: {
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    height: 45,
    width: width - 20,
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#1565c0',
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 30,
    width: '94%',
    height: 50,
    marginTop: 8,
  },
  buttontext: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '500',
    padding: 6,
    alignItems: 'center',
  },
  extrainfos: {
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    height: 115,
    width: width - 20,
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#1565c0',
    textAlign: 'center'
  }
})

export default Quote