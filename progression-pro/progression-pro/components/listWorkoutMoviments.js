import { useState, useEffect } from "react"
import { 
  View, 
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UIFlatlist from "./UIFlatList";
import { moviments } from '../database/moviments'

const RenderCardComponent = ({ item }) => {
  return(
    <View style={styles.containerDC}>
      {/* <Text style={styles.measurementTitle}>{item.}</Text>
      <Text style={styles.measurementSubTitle}>Densidade Corporal</Text> */}
    </View>
  )
}

const ListWorkoutMoviments = ({ navigation }) => {
  const [workoutMoviments, setWorkoutMoviments] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [moviments, setMoviments] = useState([])

  const fecthWorkoutMoviments = async () => {
    try {
      const workoutMovimentsResponse = await AsyncStorage.getItem("workout_movements"); 
      // console.log(workoutMovimentsResponse)

      if (workoutMovimentsResponse) {
        const workoutMovimentsObject = JSON.parse(workoutMovimentsResponse); 
        setWorkoutMoviments(workoutMovimentsObject); 
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os movimentos deste treino");
    }
  } 

  const fecthWorkouts = async () => {
    try {
      const workoutsResponse = await AsyncStorage.getItem("workouts"); 
      // console.log(workoutsResponse)

      if (workoutsResponse) {
        const workoutsObject = JSON.parse(workoutsResponse); 
        setWorkouts(workoutsObject); 
      }

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os movimentos deste treino");
    }
  }

  const joinWorkoutsMoviments = () => {
    setMoviments(moviments)

    const filterMoviments = workoutMoviments
    .filter(workoutMoviment => {
      return !moviments.some(moviment => moviment.id === workoutMoviment.movement_id)
    })
    .map(workoutMoviment => {
      const matchedMoviment = moviments.find(moviment => moviment.id === workoutMoviment.movement_id)
      return {
        ...workoutMoviment,
        nome: matchedMoviment ? matchedMoviment.nome : null,
        grupo: matchedMoviment ? matchedMoviment.grupo : null,
        explicacao: matchedMoviment ? matchedMoviment.explicacao : null,
        link_imagem: matchedMoviment ? matchedMoviment.link_imagem : null
      }
    })

    console.log(filterMoviments)
  }

  useEffect(() => {
    fecthWorkoutMoviments()
    fecthWorkouts()
    joinWorkoutsMoviments()
  },[])

  return (
    <View>
      <UIFlatlist
        itens={workoutMoviments}
        notFoundLabel='Nenhum movimento cadastrado'
        identifyKey='id'
        RenderCardComponent={RenderCardComponent}
      />
    </View>
  )
}

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
  },
  densidadeTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
})

export default ListWorkoutMoviments