import {React, useState, useContext,useEffect} from 'react'
import { FaHeart } from "react-icons/fa";
import { LikedMovieContext} from '../App';
import {saveInDb, removeFromDb} from '../utils/movieInDB'

import './Like.css'

const Like= (props)=>{

    const [liked,setLike] = useState(false)
    const likedMovie = useContext(LikedMovieContext)

   
    const likeHandler =  ()=>{
        setLike(p=>!p);
        if(liked){
            removeFromDb(props.movie.id);
        }
        else{
            saveInDb(props.movie);
        }
    }
    useEffect( ()=>{
        const checkIfPresent = async ()=>{
            const movieIndex = await likedMovie.
            findIndex((item,index)=>item.id === props.movie.id)
            if(movieIndex!== -1){
                setLike(true);
            }
            else{
                setLike(false);
            }
        }
        checkIfPresent()
    },[likedMovie])
    return (
        <FaHeart 
            className={`heart ${(liked)?'liked':'notLiked'}`} 
            onClick={likeHandler}
        />
    )
}

export default Like