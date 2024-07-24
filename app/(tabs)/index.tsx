import { Image, StyleSheet, View, Text, TextInput, ScrollView, FlatList, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavouritesScreen from './FavouritesScreen';
import DetailsScreen from './DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useState, useEffect } from 'react';
import { Datafetched } from './DataFetching';
import {FavouritesProvider} from './FavouritesContext';

const Stack = createNativeStackNavigator();

export function HomeScreen({navigation}) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        const topRatedMovies = await Datafetched();
        setMovies(topRatedMovies);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };

    getMovies();
  }, []);
  const datafiltered=movies.filter(movie=>{
    return movie.title.toLowerCase().includes(search.toLocaleLowerCase());
  }
  )

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={()=>{navigation.navigate("Favourites")}}>
      <View style={styles.header}>
        <Icon name="heart" size={25} color="red" style={styles.heartIcon} />
      </View>
      </Pressable>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"  onChangeText={setSearch}
        />
      </View>
      <View style={styles.list}>
      <FlatList
       key={'_'} 
       numColumns={2}
        data={datafiltered}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Pressable onPress={()=>{navigation.navigate("Details",{id:item.id})}}>
            <Image
              style={styles.image}
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
            />
            </Pressable>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.vote_average}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  heartIcon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  icon: {
    marginLeft: 5,
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
});

export default function App(){
  return (
    <FavouritesProvider>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{title:"Movies"}} component={HomeScreen} />
        <Stack.Screen name="Favourites" component={FavouritesScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </FavouritesProvider>
  );
}
