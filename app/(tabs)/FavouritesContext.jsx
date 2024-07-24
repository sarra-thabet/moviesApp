import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const FavouritesContext=createContext();
export const FavouritesProvider =({children})=>{
    const [favourites,setFavourites]=useState([]);
    useEffect(()=>{
        const getData = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('my-key');
                setFavourites(JSON.parse(jsonValue)); 
              
            } catch (e) {
            console.log(e);
            }
          };
          getData();
    },[]);
    useEffect(()=>{
        const storeData = async (value) => {
            try {
              const jsonValue = JSON.stringify(value);
              await AsyncStorage.setItem('my-key', jsonValue);
            } catch (e) {
              console.log(e);
            }
          };
          storeData(favourites);
    },[favourites]);//dependency array containing favourites so that when the favourites array changes the use effect will be actif 
    const deleteFavourites=(id)=>{
        const newFavourites=favourites.filter((favourite)=>favourite.id!==id);
        setFavourites(newFavourites);
    }
    const addFavourites=(movie)=>{
        setFavourites([...favourites,movie]);
    };
    return(
        <FavouritesContext.Provider value={{favourites,addFavourites,deleteFavourites}}>
            {children}
        </FavouritesContext.Provider>
    )
}