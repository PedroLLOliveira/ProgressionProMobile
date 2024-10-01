import React, { useState, useEffect, createContext } from 'react';
import { 
  View, 
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UIFlatlist from './UIFlatList';
import UISearchInput from './UISearchInput';
import UISelectMovimentsCard from './UISelectMovimentsCard';

const SelectMoviments = ({ navigation }) => {
  const [movimentsData, setMovimentsData] = useState()

  useEffect(() => {
    const fetchMoviments = async () => {
      try {
        const moviments = await AsyncStorage.getItem('movements');
        if(moviments) {
          const moviemntsObject = JSON.parse(moviments);
          setMovimentsData(moviemntsObject);
        }
      } catch(error) {
        Alert.alert("Erro", "Não foi possível carregar os movimentos.");
      }
    }
    fetchMoviments()
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