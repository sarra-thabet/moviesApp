import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('my-key');
                setFavourites(jsonValue ? JSON.parse(jsonValue) : []); // Default to empty array if null
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem('my-key', jsonValue);
            } catch (e) {
                console.log(e);
            }
        };
        storeData(favourites);
    }, [favourites]);

    const deleteFavourites = (id) => {
        const newFavourites = favourites.filter((favourite) => favourite.id !== id);
        setFavourites(newFavourites);
    };

    const addFavourites = (movie) => {
        setFavourites(prevFavourites => {
            if (Array.isArray(prevFavourites)) {
                return [...prevFavourites, movie];
            } else {
                console.error("Favourites is not an array");
                return [movie]; // Fallback to an array with the new movie
            }
        });
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourites, deleteFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
};
