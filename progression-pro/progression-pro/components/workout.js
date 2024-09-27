import React, { useState, useEffect } from 'react';
import { 
    View,
    Alert,
    StyleSheet,
  } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UIFlatlist from './UIFlatList';
import UISectionAddButton from './UISectionAddButton';
import UIWorkoutCard from './UIWorkoutCard';

const WorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState('');

  const handleAddWorkouts = () => {
    navigation.navigate('AddWorkoutScreen')
  }

  const fetchWorkoutsData = async () => {
    try {
      const workoutsResponse = await AsyncStorage.getItem("workouts");

      if (workoutsResponse) {
        const workoutsObject = JSON.parse(workoutsResponse);;
        setWorkouts(workoutsObject); 
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os treinos do usuário.");
    }
  };

  useEffect(() => {
    fetchWorkoutsData()
  }, [])

  return (
    <View style={styles.screen}>
      <UISectionAddButton
        addFunction={handleAddWorkouts}
      />
      <UIFlatlist
        itens={workouts}
        notFoundLabel='Nenhum treino cadastrado.'
        identifyKey='id'
        RenderCardComponent={UIWorkoutCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
});

export default WorkoutScreen;
