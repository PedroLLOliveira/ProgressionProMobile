import { 
  View, 
  Text,
  Alert,
  Pressable,
  StyleSheet,
  Image
} from 'react-native';

const UIMovimentsCard = ({ item }) => {

  return (
    <Pressable onPress={() => Alert.alert('pressable')}>
      <View style={styles.card}>
        <View style={styles.sectionTitles}>
          <View>
            <Text style={styles.subTitle}>{item.grupo}</Text>
          </View>
          <View>
            <Text style={styles.title}>{item.nome}</Text>
          </View>
        </View>
        <View>
          {/* TODO: checkbox  */}
        </View>
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
  sectionTitles: {
    gap: 2
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2c3e50',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  }
});

export default UIMovimentsCard