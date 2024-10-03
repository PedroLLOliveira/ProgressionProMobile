import { 
  View, 
  Text,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UIWorkoutCard = ({ item }) => {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate('ListWorkoutMoviments', { workoutId: item.id }) }>
      <View style={styles.card}>
        <Text style={styles.cardText}>{item.explicacao}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
});

export default UIWorkoutCard