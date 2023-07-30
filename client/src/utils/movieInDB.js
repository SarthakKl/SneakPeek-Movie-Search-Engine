import axios from "axios"
import { fetchMovieById } from './tmdbApi';

const uri = "http://localhost:5000/"
// const uri = "https://movie-search-engine-backend.vercel.app/"
export const saveInDb = async (movie)=>{
const token = JSON.parse(localStorage.getItem('user'))?.token;

    const movieDetails = await fetchMovieById(movie.id)

    console.log("detail",movieDetails)
    console.log(token)
    const movieObj = {
        id     : movieDetails.id,
        title  : movieDetails.title,
        rating : movieDetails.vote_average,
        genre  : movieDetails.genres
    }

    const response = await axios.post(uri+"saveMovie",movieObj,{
        headers: {
            'token':token
        }
    });
    console.log(response);
}

export const removeFromDb = async (movieId)=>{
    console.log("movie id: ",movieId);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    
    const response = await axios({
        method:'delete',
        url:uri+"delMovie",
        data:{movieId},
        headers:{token}
    })
    
    console.log(response);
}

export const getLikedMovies = async(setLikedData)=>{
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const response = await axios({
        method:'get',
        url:uri+"getLikedMovies",
        headers:{token}
    })
    // console.log("movie list ",response.data.data);
    setLikedData(response?.data?.data || [])
}

// module.export = {saveInDb, removeFromDb, getLikedMovies}