import React, { useState } from 'react';
import { 
  View, 
  TextInput,
  StyleSheet,
} from 'react-native';

const UITextInput = ({ placeholder, height, width, onChange, type }) => {

  return (
    <View style={[ styles.containerInput, { height: height, width: width } ]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        keyboardType={type}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    padding: 10,
  },
  input: {
    height: 60,
    width: 315

  }
})

export default UITextInput