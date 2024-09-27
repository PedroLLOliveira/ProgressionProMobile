import React, { useState } from 'react';
import { 
  View, 
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const UIFlatlist = ({ itens, notFoundLabel, identifyKey, RenderCardComponent }) => {

  return(
    <View>
    { itens ? (
      <FlatList
        data={itens}
        renderItem={({ item }) => <RenderCardComponent item={item} /> }
        keyExtractor={item => item[identifyKey].toString()}
        contentContainerStyle={styles.listContainer}
      />
      ) : (
        <Text style={styles.noMeasurementText}>{notFoundLabel}</Text>
      ) }
    </View>
  )

}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  noMeasurementText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
export default UIFlatlist