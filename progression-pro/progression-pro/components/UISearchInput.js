import React, { useState } from 'react';
import { 
  View, 
  TextInput,
  StyleSheet,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const UISearchInput = ({ placeholder }) => {

  return (
    <View style={styles.containerInput}>
      <AntDesign name="search1" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        // onChangeText={(searchString) => {this.setState({searchString})}}
        underlineColorAndroid="transparent"
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
    height: 60,
    width: 350
  },
  input: {
    height: 60,
    width: 315

  }
})

export default UISearchInput