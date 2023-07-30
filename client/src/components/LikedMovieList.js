import {useContext,React} from 'react'
import {LikedMovieContext} from '../App'
import MovieListCard from './MovieListCard';
function LikedMovieList() {

    const data = useContext(LikedMovieContext);
    console.log("list",data);

    return (
        <div>
            <div>
            <table className='modal-heading'>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    </tr>
                
                </thead>
                <tbody>
                
                    {
                        data.map((movie)=>{
                            return <MovieListCard movie={movie} key={movie.id}/>
                        })
                    }
                
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default LikedMovieList