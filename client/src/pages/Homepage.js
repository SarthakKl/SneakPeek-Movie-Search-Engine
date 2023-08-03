import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/homepage/MovieCard'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import './Homepage.css'
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
             <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/200/300"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/200/300"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/200/300"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
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