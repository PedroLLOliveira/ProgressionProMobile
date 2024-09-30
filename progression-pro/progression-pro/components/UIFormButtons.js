import { 
  View, 
  StyleSheet,
} from 'react-native'
import UIButton from './UIButton'

const UIFormButtons = ({
   cancelLabel, 
   cancelButtonColor,
   labelColorCancel,
   submitLabel,
   submitButtonColor,
   labelColorSubmit,
   height,
   width,
   functionCancel,
   functionSubmit
   }) => {

  return (
    <View style={styles.buttonsSection}>
      <UIButton
        label={ cancelLabel ? cancelLabel : 'Cancelar' }
        buttonColor={cancelButtonColor ? cancelButtonColor : 'red' }
        labelColor={labelColorCancel ? cancelButtonColor : 'white' }
        height={height}
        width={width}
        onPress={functionCancel}
      />
      <UIButton
        label={submitLabel ? submitLabel : 'Ok'}
        buttonColor={submitButtonColor ? submitButtonColor : 'green'}
        labelColor={labelColorSubmit ? labelColorSubmit : 'white'}
        height={height}
        width={width}
        onPress={functionSubmit}
      />
  </View>
  )
}

const styles = StyleSheet.create({
  buttonsSection: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 10
  }
})


export default UIFormButtons