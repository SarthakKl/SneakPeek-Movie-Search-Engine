import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import axios from 'axios'

import { MovieContext, UserContext } from '../App'
// import { errorApi } from '../utils/backend_api'

function Homepage() {
    // const [movies,setMovies] = useState(null);
    const movies = useContext(MovieContext)
    // const checkError = async ()=>{
    //     await errorApi()
    // }
    useEffect(()=>{
        // checkError()
        const token = localStorage.getItem('Token')
        axios.defaults.headers.token=token
        console.log("xyz :  ",movies)
    },[])
    return (
        <div > 
            <div className='movies-container'>
                {
                    movies.map((movie)=>{
                        return <MovieCard movie={movie} key={movie.id}/>
                    })
                }
            </div>
        </div>
    )
}

export default Homepage