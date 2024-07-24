import axios from "axios";
const API_KEY = "4ecf0cbadb15354be3f3f3d5337cde9a";
const BASE_URL = "https://api.themoviedb.org/3";
export const Datafetched= async() => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
          params: {
            api_key: API_KEY,
            page: "1",
            },
        });
        return response.data.results;
      }catch (error) {
        console.error("Error fetching top-rated movies", error);
        return [];
      }
    
}
export const movieDetails= async(movie_id)=>{
  try{
    const response = await axios.get(`${BASE_URL}/movie/${movie_id}`, {
      params: {
        language: 'en-US',
        api_key: API_KEY,
      },
      
    });
    console.log(response.data);
    return response.data;
  }catch(err){
    console.log("error fetching data",err);
  }
} 