import React from 'react'
import { Dimensions, StyleSheet, TextInput } from 'react-native'

const { width } = Dimensions.get('window')

const Input = ({
  placeholder, type, secureTextEntry = false, onChangeText
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={v => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor='#1565c0'
    selectionColor={'#1565c0'}
  />
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    height: 45,
    width: width - 30,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#1565c0',
    textAlign: 'center'
  }
})

export default Input