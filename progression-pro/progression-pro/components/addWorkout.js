import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet,
} from 'react-native';
import moviments from '../database/moviments';
import UIFlatlist from './UIFlatList';
import UISearchInput from './UISearchInput';
import UIMovimentsCard from './UIMovimentsCard';

const AddWorkoutScreen = ({ navigation }) => {
  const [movimentsData, setMovimentsData] = useState()

  useEffect(() => {
    setMovimentsData(moviments)
  }, [])

  return(
    <View style={styles.screen}>
      <View style={{ alignItems: 'center' }}>
        <UISearchInput
          placeholder='Pesquise o movimento'
        />
      </View>
      <UIFlatlist
        itens={movimentsData}
        notFoundLabel='Nenhum movimento cadastrado.'
        identifyKey='nome'
        RenderCardComponent={UIMovimentsCard}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 50,
  },
})

export default AddWorkoutScreen