import React from 'react'
import { Dimensions, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native'

import { graphql, compose } from 'react-apollo'
import { buildSubscription } from 'aws-appsync'
import { graphqlMutation } from 'aws-appsync-react'

import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Ionicons';

import gql from 'graphql-tag';
import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync';
import aws_config from '../../aws-exports';
import { Auth } from 'aws-amplify'


import { listQuotes } from '../../graphql/queries'
import { createQuoteMutation } from '../../graphql/mutations'
import { onCreateQuote } from '../../graphql/subscriptions'

const { width } = Dimensions.get('window')

class Quote extends React.Component {
  static navigationOptions = {
    title: 'RFQ'
  }
  state = {
    identity: '',
    userEmail: '',
    capacity: '',
    angle: '',
    length: '',
    loading: '',
    material: '',
    extrainfos: '',
    username: '',
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ identity: user.signInUserSession.accessToken.payload })
        this.setState({ userEmail: user.attributes.email })
        this.setState({ username: user.username })
      })
  }

  onChangeText = (key, value) => { this.setState({ [key]: value })
    
  // createQuote = () => {
  //   this.props.createQuote(this.state)
  //   const { identity, userEmail, capacity, angle, length, loading, material, extrainfos } = this.state;
  //   this.setState({ capacity: '', angle: '', length: '', loading: '', material: '', extrainfos: '' })
  //   }
  // export default compose(
  //   graphql(AddCityMutation, {
  //     props: props => ({
  //       onAdd: city => props.mutate({
  //         variables: city
  //       })
  //     })
  //   })
  // )(AddCity)

  createQuote = (async () => {
      const { username, capacity, angle, length, loading, material, extrainfos } = this.state;
      this.setState({ capacity, angle, length, loading, material, extrainfos })

      // const result = graphql(createQuoteMutation, {
      //   props: props => ({
      //     onAdd: quote => props.mutate({
      //       variables: {
      //         input: {
      //           username, userEmail, capacity, angle, length, loading, material, extrainfos
      //         }    
      //       }
      //     })
      //   })
      // })
      // console.log(result);

      const result = await client.mutate({
        mutation: gql(createQuoteMutation),
        variables: {
          input: {
            capacity, angle, length, loading, material, extrainfos
          }
        }
      });
      console.log(result.data);
    })
  }
  render() {
    console.log(this.state)
    console.log(Auth.currentCredentials())

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please Fill Informations Below</Text>
        
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
            onPress={this.createQuote}
          >
          <Text style={styles.buttontext}> Submit </Text>
        </TouchableOpacity>
    
      </View>
    )
  }
}

// const WithData = compose(
//   graphqlMutation(createQuote, listQuotes, 'Quote'),
//   graphql(listQuotes, {
//     options: {
//       fetchPolicy: 'cache-and-network'
//     },
//     props: props => ({
//       createQuote: quote => props.mutate({
//         variables: quote,
//         optimisticResponse: {
//           __typename: 'Mutation',
//           createQuote: { ...quote, __typename: 'Quote'}
//         },
//         update: (proxy, { data: { createQuote } }) => {
//           const data = proxy.readQuery({ query: listQuotes })
//           let stopExecuting = false
//           if (item.id === createQuote.id) {
//             stopExecuting = true
//           }
//         }
//       })
//     })
//   })
// )(Quote)


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