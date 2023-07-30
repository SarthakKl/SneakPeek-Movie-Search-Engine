import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Like from './Like'
import './MovieCard.css'

function MovieCard({movie}) {
    const imageBaseUri = 'https://image.tmdb.org/t/p/original'
    const imageBaseUri2 ='https://image.tmdb.org/t/p/w500'
    const navigate  = useNavigate()
    const title = movie.title? movie.title.length > 40? movie.title.substring(0,40)+'...':movie.title  :'x     ..'

    const openMovieDetails = ()=>{
        const link = "/movie/" + movie.id;
        navigate(link)
    }

    return (
        <div className='movie_card'>
            <Like movie={movie}/>
            <img 
                src={imageBaseUri2+movie.poster_path} 
                alt="poster" 
                className='poster img-card' 
                onClick={openMovieDetails}
            />
            <div className='shadow-div' onClick={openMovieDetails}>
                <p className="movie-title">{title}</p>
            </div>
        </div>
    )
}

export default MovieCard