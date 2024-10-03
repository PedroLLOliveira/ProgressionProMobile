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
import UIFormButtons from './UIFormButtons';

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

      <View style={{ marginBottom: 80 }}>
        <UIFlatlist
          itens={movimentsData}
          notFoundLabel='Nenhum movimento cadastrado.'
          identifyKey='id'
          RenderCardComponent={UISelectMovimentsCard}
        />
      </View>

      <UIFormButtons
        submitLabel={'Finalizar'}
        height={60}
        width={170}
        functionCancel={ () => console.log('teste') }
        functionSubmit={ () => console.log('teste') }
      />

      {/* TODO: os botões não apareceram, verificar que porra é essa */}
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