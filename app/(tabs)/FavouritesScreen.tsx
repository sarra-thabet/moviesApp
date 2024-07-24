import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, View, Text, TextInput, ScrollView, FlatList, Pressable } from 'react-native';
import { FavouritesContext } from "./FavouritesContext"
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function FavouritesScreen(){
    const {favourites,deleteFavourites}=useContext(FavouritesContext);
   
    return(
        <View style={styles.container}>
            <FlatList
       key={'_'} 
       numColumns={2}
        data={favourites}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              style={styles.image}
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
            />
            <Pressable onPress={()=>deleteFavourites(item.id)}><Icon name="trash" size={25} /></Pressable>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.vote_average}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        padding:30,
        flex:1
    },
    title: {
        marginTop:10,
        marginBottom:5,
        width: 150,
        flexWrap: 'wrap',
      },
    
      input: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
      },
      movieItem: {
        marginBottom: 10,
        width:200,
        
      },
      image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderWidth:2,
        borderRadius:10,
        borderColor:'black'
      },
})