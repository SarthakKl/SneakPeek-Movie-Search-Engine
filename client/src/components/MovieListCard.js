import React from 'react'
import './MovieListCard.css'

function MovieListCard({movie}) {   //card for single list row

    // const = movieDetails.
    // console.log(movie.id); 
  return (
    <tr className='tbrow'>
        <td>{movie.title}</td>
        <td className='movie-genre'>
          {movie.genre.map((gen)=>{
            return (<span>{gen.name} </span>)
        }).slice(0,2)}</td>
        {/* <h1>{movie.genre[0]}</h1> */}
        <td>{movie.rating}</td>
    </tr>
  )
}

export default MovieListCard