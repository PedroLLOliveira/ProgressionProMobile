import { 
  StyleSheet,
  Pressable,
  Text
} from 'react-native';

const UIButton = ({ label, height, width, labelColor, buttonColor, onPress }) => {

  return (
    <Pressable 
      style={[ styles.containerInput, { height: height, width: width, backgroundColor: buttonColor } ]}
      onPress={onPress}
    >
      <Text style={{ color: labelColor }}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    padding: 10,
  },
})

export default UIButton