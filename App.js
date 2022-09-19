import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
 
  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)  
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(error => {
      Alert.alert('Error', error);
    });   
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatlist}>
        <FlatList
          data = {recipes}
          renderItem={({item}) =>
          <View style={{marginBottom: 5}}>
            <Text style= {{fontSize : 20}}>{item.strMeal}</Text>
            <Image 
              style={{width:200,height:100}} 
              source= {{uri: item.strMealThumb}}
            />
          </View>
          } 
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <TextInput
          style={styles.input} 
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
        />
        <Button
          title='FIND'
          onPress = {() => getRecipes()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    
  },
  flatlist: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
});