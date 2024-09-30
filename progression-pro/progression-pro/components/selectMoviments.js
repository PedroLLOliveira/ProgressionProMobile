import React, { useState, useEffect, createContext } from 'react';
import { 
  View, 
  StyleSheet,
} from 'react-native';
import moviments from '../database/moviments';
import UIFlatlist from './UIFlatList';
import UISearchInput from './UISearchInput';
import UISelectMovimentsCard from './UISelectMovimentsCard';

const SelectMoviments = ({ navigation }) => {
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
        identifyKey='id'
        RenderCardComponent={UISelectMovimentsCard}
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

export default SelectMoviments