import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity
  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const WorkoutScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState('');

  const handleAddWorkouts = () => {
    navigation.navigate('AddWorkoutScreen')
  }

  const WorkoutItem = ({ title }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleAddWorkouts}>
          <AntDesign  
            name="pluscircle" 
            size={24} 
            // color="#3498db"
            color='blue'
          />
        </TouchableOpacity>
      </View>
      { workouts ? (
        <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutItem title={item.explicacao} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      ) : (
        <Text style={styles.noMeasurementText}>Nenhum treino cadastrado.</Text>
      ) }
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
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  noMeasurementText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default WorkoutScreen;
