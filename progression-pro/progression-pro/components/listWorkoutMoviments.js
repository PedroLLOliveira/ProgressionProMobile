import { useState, useEffect } from "react";
import { 
  View, 
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UIFlatlist from "./UIFlatList";

const RenderCardComponent = ({ item }) => {
  return (
    <View style={styles.containerDC}>
      <Text style={styles.measurementTitle}>{item.nome}</Text>
      <Text style={styles.measurementSubTitle}>Grupo: {item.grupo}</Text>
      <Text>Repetições: {item.repeticoes}</Text>
      <Text>Explicação: {item.explicacao}</Text>
    </View>
  );
};

const ListWorkoutMoviments = ({ navigation }) => {
  const [workoutMoviments, setWorkoutMoviments] = useState([]);
  const [joinedData, setJoinedData] = useState([]);

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
    const joinedMoviments = workoutMoviments.map(workoutMoviment => {
      const matchedMoviment = moviments.find(moviment => moviment.id === workoutMoviment.movement_id);
      return {
        ...workoutMoviment,
        nome: matchedMoviment ? matchedMoviment.nome : 'Movimento não encontrado',
        grupo: matchedMoviment ? matchedMoviment.grupo : 'Desconhecido',
        explicacao: matchedMoviment ? matchedMoviment.explicacao : 'Sem explicação',
        link_imagem: matchedMoviment ? matchedMoviment.link_imagem : null
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
    <View>
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
    marginTop: 50
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
