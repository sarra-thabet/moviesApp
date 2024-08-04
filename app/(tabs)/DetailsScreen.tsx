import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { movieDetails } from "./DataFetching";
import { Icon } from '@rneui/themed';   
import { FavouritesContext } from "./FavouritesContext";

export default function DetailsScreen({ route, navigation }) {
  const [movie, setMovie] = useState({});
  const { favourites, addFavourites, deleteFavourites } = useContext(FavouritesContext);
  const { id } = route.params;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const movieFetch = async () => {
      try {
        const result = await movieDetails(id);
        setMovie(result);

        // Ensure favourites is an array before using it
        if (Array.isArray(favourites)) {
          setLiked(favourites.some(fav => fav.id === result.id));
        } else {
          setLiked(false); // Default to false if favourites is not an array
        }
      } catch (e) {
        console.log("error fetching data", e);
      }
    };
    movieFetch();
  }, [id, favourites]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.overlay}>
          <View style={{ marginLeft: 350, flexDirection: 'row' }}>
            {
              liked ?
                <Pressable onPress={() => {
                  deleteFavourites(movie.id);
                  setLiked(false);
                }}>
                  <Icon name="heart" type='font-awesome' color='#ff0000' />
                </Pressable>
                :
                <Pressable onPress={() => {
                  addFavourites(movie);
                  setLiked(true);
                }}>
                  <Icon name="heart-o" type='font-awesome' color='#ff0000' />
                </Pressable>
            }
          </View>
          <View style={styles.textContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.rating}>{movie.vote_average}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailText}>Duration: {movie.runtime} mins</Text>
              <Text style={styles.detailText}>Release Date: {movie.release_date}</Text>
            </View>
            <View style={styles.genres}>
              {movie.genres?.map((genre) => (
                <View key={genre.id} style={styles.genreBox}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <View style={{ borderWidth: 1, height: 'auto', padding: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>{movie.overview}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: 'relative',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  image: {
    width: '100%',
    height: 300,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  textContainer: {
    padding: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  rating: {
    color: 'white',
    fontSize: 18,
  },
  details: {
    marginBottom: 20,
  },
  detailText: {
    color: 'white',
    fontSize: 16,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreBox: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'white',
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  genreText: {
    color: 'white',
    fontSize: 14,
  },
  overviewContainer: {
    padding: 20,
  },
  overviewTitle: {
    fontSize: 20,
  }
});
