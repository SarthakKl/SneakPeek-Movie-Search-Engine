import React from 'react'
import './MovieListCard.css'

function MovieListCard({movie}) {   //card for single list row

    // const = movieDetails.
    // console.log(movie.id); 
  return (
    <tr className='tbrow'>
        <td>{movie.title}</td>
        <td className='movie-genre'>
          {
            movie.genre.map((gen, index)=>{
              return (<span key={index}>{gen.name} </span>)
            }).slice(0,2)
          }
        </td>
        <td>{movie.rating}</td>
    </tr>
  )
}

export default MovieListCard