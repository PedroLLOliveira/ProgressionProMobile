import { useState, useEffect, useContext } from "react";
import { 
  View, 
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { ListWorkoutMovimentsContext } from '../App';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UIFlatlist from "./UIFlatList";
import UISectionAddButton from './UISectionAddButton';
import { insertWorkoutMovement } from '../database/database';

const RenderCardComponent = ({ item }) => {
  return (
    <View style={styles.containerDC}>
      <Text style={styles.measurementTitle}>{item.nome}</Text>
      <Text style={styles.measurementSubTitle}>Grupo: {item.grupo}</Text>
      <View style={[ styles.containerDC ]}>
        { item.explicacao ? <Text>Explicação: {item.explicacao}</Text> : ''}
        <Text>Repetições: {item.repeticoes}</Text>
        <Text>Séries: {item.series}</Text>
        <Text>Descanso: {item.descanso}</Text>
      </View>
    </View>
  );
};

const ListWorkoutMoviments = ({ navigation, route }) => {
  const [workoutMoviments, setWorkoutMoviments] = useState([]);
  const [joinedData, setJoinedData] = useState([]);
  const { listWorkoutMoviments, setListWorkoutMoviments } = useContext(ListWorkoutMovimentsContext)

  const goToSelectMoviments = () => {
    navigation.navigate('SelectMoviments')
  }

  // Função para buscar os movimentos dos treinos
  const fecthWorkoutMoviments = async () => {
    try {
      const workoutMovimentsResponse = await AsyncStorage.getItem("workout_movements"); 
      if (workoutMovimentsResponse) {
        const workoutMovimentsObject = JSON.parse(workoutMovimentsResponse); 
        setWorkoutMoviments(workoutMovimentsObject);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os movimentos deste treino");
    }
  };

  // Função que realiza o "join" entre os movimentos e o treino
  const joinWorkoutsMoviments = async () => {
    const movimentsResponse = await AsyncStorage.getItem('movements')
    
    const moviments = JSON.parse(movimentsResponse)

    const movimentsOfWorkout = workoutMoviments.filter(workoutMoviment => 
        workoutMoviment.workout_id === route.params.workoutId
    )

    const joinedMoviments = movimentsOfWorkout.map(workoutMoviment => {
      const movimentsToJoin = moviments.find(moviment => moviment.id === workoutMoviment.movement_id)

      return {
        ...workoutMoviment,
        nome: movimentsToJoin ? movimentsToJoin.nome : 'Movimento não encontrado',
        grupo: movimentsToJoin ? movimentsToJoin.grupo : 'Desconhecido',
        explicacao: movimentsToJoin ? movimentsToJoin.explicacao : 'Sem explicação',
        link_imagem: movimentsToJoin ? movimentsToJoin.link_imagem : null
      };
    });

    setJoinedData(joinedMoviments); // Armazena o resultado da junção
  };

  useEffect(() => {
    // Primeiro, busca os dados dos movimentos dos treinos
    const fetchData = async () => {
      await fecthWorkoutMoviments();
    };

    fetchData();
  }, []);

  // Sempre que workoutMoviments mudar, faça a junção
  useEffect(() => {
    if (workoutMoviments.length > 0) {
      joinWorkoutsMoviments();
    }
  }, [workoutMoviments]);

  return (
    <View style={styles.screen}>
      <UISectionAddButton
        addFunction={goToSelectMoviments}
      />
      <UIFlatlist
        itens={joinedData} // Usa os dados já "joinados"
        notFoundLabel="Nenhum movimento cadastrado"
        identifyKey="id"
        RenderCardComponent={RenderCardComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    marginTop: 40
  },
  containerDC: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    marginTop: 20
  },
  measurementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  measurementSubTitle: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ListWorkoutMoviments;
