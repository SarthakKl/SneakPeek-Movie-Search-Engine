import axios from "axios"
import { fetchMovieById } from './tmdbApi';

const uri = "http://localhost:5000/api/user/"
// const uri = "https://movie-search-engine-backend.vercel.app/"
export const userAxios = axios.create({baseURL:uri})

export const validateToken = async () => {
    try {
        // console.log(token)
        const response = await userAxios({
            url:'/',
            method:'get'
        })
        if(response.data.error)
            throw Error(response.data.error)
        return response.data
    } catch (error) {
        console.log(error)
        return {error:error?.message}
    }
}
export const changePassword = async (oldPass, newPass) => {
    try {
        const response = await userAxios({
            url:'change-password',
            method:'put',
            data:{
                oldPass,newPass
            }
        })
        if(response.data.error)
            throw Error(response.data.error)
        return response.data
    } catch (error) {
        console.log(error)
        return {
            error:error?.message
        }
    }
}
export const saveInDb = async (movie)=>{
    try {
        const movieDetails = await fetchMovieById(movie.id)
        const movieObj = {
            id     : movieDetails.id,
            title  : movieDetails.title,
            rating : movieDetails.vote_average,
            genre  : movieDetails.genres
        }
        const response = await userAxios.post("saveMovie",movieObj);
        if(response.error)
            throw Error(response.error)

    } catch (error) {
        console.log(error)
        return {error:error.message}
    }
}

export const removeFromDb = async (movieId)=>{
    try {
        const response = await userAxios({
            method:'delete',
            url:"delMovie",
            data:{movieId}
        })
        if(response.data.error)
            throw Error(response.data.error)
        
    } 
    catch (error) {
        console.log(error)
        return {error:error.message}
    }
}

export const getLikedMovies = async(setLikedData)=>{
    try {
        const response = await userAxios({
            method:'get',
            url:"getLikedMovies"
        })
        if(response.data.error)
            throw Error(response.data.error)
        setLikedData(response?.data?.data || [])
    } 
    catch (error) {
        console.log(error)
        return {error:error.message}
    }   
}
