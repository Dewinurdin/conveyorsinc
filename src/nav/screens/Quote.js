import React from 'react'
import { Dimensions, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { Auth, API, graphqlOperation } from 'aws-amplify'
import { buildSubscription } from 'aws-appsync'
import { graphqlMutation } from 'aws-appsync-react'
import { graphql, compose } from 'react-apollo'

import { UserContext } from '../../context/userContext'
import Input from '../../components/Input'
import { getUser } from '../../graphql/queries'
import { createQuote } from '../../graphql/mutations'
import { onCreateQuote } from '../../graphql/subscriptions'

import colors from '../../styles/colors'

const { width } = Dimensions.get('window')

class Quote extends React.Component {
  static navigationOptions = {
    title: 'RFQ'
  }
  state = {
    user: '',
    identity: '',
    userid: '',
    username: '',
    given_name: '',
    family_name: '',
    email: '',
    capacity: '',
    angle: '',
    length: '',
    loading: '',
    material: '',
    extrainfos: '',
    submitted: false,
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({ user: user })
    this.setState({ identity: user.signInUserSession.accessToken.payload })
    this.setState({ userid: user.signInUserSession.accessToken.payload.sub })
    this.setState({ username: user.username })
    this.setState({ given_name: user.attributes.given_name })
    this.setState({ family_name: user.attributes.family_name })
    this.setState({ email: user.attributes.email })
  }

    onChangeText = (key, value) => this.setState({ [key]: value })
    
    handleSendEmail = async user => {
      // GET FORM DATA & CREATE QUOTE
      const { capacity, angle, length, loading, material, extrainfos, email, userid, username, given_name, family_name } = this.state;
      const input = { capacity, angle, length, loading, material, extrainfos }
      try {
        // CREATE
        const graphqlResult = await API.graphql(graphqlOperation(createQuote, { input }))
        const ownerEmail = email

        const lambdaResult = await API.post('lambdaemailquote', '/email', {
          body: {
            capacity, angle, length, loading, material, extrainfos, email: {ownerEmail}, profile: {given_name, family_name}
  
          },
          email: {
            ownerEmail
          },
          profile: {
            given_name, family_name
          }
        })
        this.setState({ submitted: true })
        console.log("Successfully CREATED GraphQL Quote API: ", graphqlResult)
        console.log("Successfully send Lambda Quote API: ", lambdaResult)
      } catch (err) {
        console.error('Error Submitting Form: ', err)
      }
    }

    render() {
      const { identity, given_name, family_name, email, user, submitted } = this.state;
      // console.log("USER MOUNTED: ", user)
      // console.log("Current User: ", identity)
      // console.log("Username: ", this.state.username)
      // console.log("First Name: ", given_name)
      // console.log("Last Name: ", family_name)
      // console.log("Email: ", email)
      // console.log("User ID: ", identity.sub)
      if (submitted === true) {
        return <Text>Quote Request Successfully Submitted!</Text>
      }
      return (
        <UserContext.Consumer>
          {({ user }) =>
            <View style={styles.container}>
              <Text style={styles.title}>Please provide informations:</Text>
              
              <TextInput placeholder='Capacity'
                style={styles.input}
                placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={value => this.onChangeText('capacity', value)}      
              />
              <TextInput placeholder='Angle'
                style={styles.input}
                placeholderTextColor='#90caf9'
                selectionColor={'#1565c0'}
                onChangeText={value => this.onChangeText('angle', value)}      
                />
                <TextInput placeholder='Length'
                  style={styles.input}
                  placeholderTextColor='#90caf9'
                  selectionColor={'#1565c0'}
                  onChangeText={value => this.onChangeText('length', value)}      
                  />
                <TextInput placeholder='Loading'
                  style={styles.input}
                  placeholderTextColor='#90caf9'
                  selectionColor={'#1565c0'}
                  onChangeText={value => this.onChangeText('loading', value)}      
                  />
                <TextInput placeholder='Material'
                  style={styles.input}
                  placeholderTextColor='#90caf9'
                  selectionColor={'#1565c0'}
                  onChangeText={value => this.onChangeText('material', value)}      
                  />
                <TextInput placeholder='Extra Informations'
                  style={styles.extrainfos}
                  placeholderTextColor='#90caf9'
                  selectionColor={'#1565c0'}
                  onChangeText={value => this.onChangeText('extrainfos', value)}      
                  />

                <TouchableOpacity
                  style={styles.button}
                  onPress={()=> this.handleSendEmail(user)}
                >
                <Text style={styles.buttontext}> Submit </Text>
              </TouchableOpacity>
          
            </View>
          }
        </UserContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightGreyBackground,
    padding: 8
  },
  title: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
    padding: 8,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 3,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#1565c0',
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4169E1',
    padding: 8,
    borderRadius: 8,
    width: '95%',
    height: 50,
    marginTop: 8,
  },
  buttontext: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '500',
    padding: 6,
    alignItems: 'center',
  },
  extrainfos: {
    backgroundColor: colors.white,
    borderRadius: 3,
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
