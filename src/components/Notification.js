import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../styles/colors'

class Notification extends Component {
  constructor(props) {
    super (props);
    this.state = {
      positionValue: new Animated.Value(-60),
    }
  }

  animateNotification = (value) => {
    const { positionValue } = this.state;
    Animated.timing(
      positionValue,
      {
        toValue: value,
        duration: 400,
        velocity: 3,
        tension: 2,
        friction: 8,
        easing: Easing.easeOutBack,
      }
    ).start();
  }

  closeNotification = () => {
    this.props.handleCloseNotification();
  }
  render() {
    const { type, message, showPasswordErrorNotification, showEmailErrorNotification } = this.props;
    showPasswordErrorNotification ? this.animateNotification(60) : this.animateNotification(0);
    const { positionValue } = this.state;
    
    return (
      <Animated.View style={[ { marginBottom: positionValue }, styles.wrapper ]}>
        <View style={styles.errorWrapper}>
          <Text style={styles.text}>{type}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification}
        >
        <Icon
          name="times"
          size={20}
          color={colors.lightGray}
        />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: '#f5f5f5',
    height: 'auto',
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 8,
    position: 'relative',
    borderRadius: 1,
    // bottom: -270,
  },
  errorWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width: '100%',
  },
  text: {
    color: colors.darkOrange,
    fontSize: 14,
    marginBottom: 2,
    fontWeight: '500',
    marginRight: 6,
  },
  message: {
    marginBottom: 2,
    fontSize: 12,
    paddingRight: 10,
    color: colors.messageColor,
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 7,
  },
})

export default Notification