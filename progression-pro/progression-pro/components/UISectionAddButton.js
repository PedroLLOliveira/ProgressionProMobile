import { 
  View, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const UISectionAddButton = ({ addFunction }) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={addFunction}>
        <AntDesign  
          name="pluscircle" 
          size={24} 
          // color="#3498db"
          color='blue'
        />
      </TouchableOpacity>
    </View>
  ) 
}

const styles = StyleSheet.create({
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

export default UISectionAddButton