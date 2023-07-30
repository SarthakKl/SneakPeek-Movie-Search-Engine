import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect, useContext, React} from 'react'

import {fetchMovieByName} from '../utils/tmdbApi'
import {FaUserAlt} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown';
import MovieListModal from './MovieListModal'
import './Navbar.css'
import { UserContext } from '../App';

const Navbar = ({setUser,setMovies})=>{

    const navigate = useNavigate();
    const [modalShow,setModalShow] = useState(false);
    const [searchMovie,setSearchMovie] = useState('');
    const user = useContext(UserContext)

    const searchMovies = async()=>{
        console.log(searchMovie);
        const data = await fetchMovieByName(searchMovie)
        setMovies(data)
    }

    useEffect(()=>{
        console.log(user)
    },[user])
   
    const openProfile = ()=>{
        navigate(`/user/:${user.username}`)
    }
    
    const logoutHandler = ()=>{
        localStorage.clear();
        navigate('/'); 
        setUser(null)
    }
    return (
        <nav className='nav'>
                <h1 className='site-title' onClick={()=>navigate('/')}>SneakPeek</h1>
                <div className='search-and-user'>
                    <div className='search-box-container'>
                        <input 
                            type="text" 
                            className='search-input'
                            placeholder='Enter Movie Name' 
                            onChange={(e)=>{
                                setSearchMovie(e.target.value)
                            }}
                            onKeyPress={(e)=>{
                                if (e.code==="Enter") searchMovies()
                            }}
                        />
                        <button className='search-button' onClick={searchMovies}>Search</button>
                    </div>
                    <Dropdown className='account'>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <FaUserAlt/>
                        </Dropdown.Toggle>
                        {
                            user?.username?
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{navigate('/')}}>Home</Dropdown.Item>
                                <Dropdown.Item onClick={openProfile}>{user?.username}</Dropdown.Item>
                                <Dropdown.Item onClick={() => setModalShow(true)}>Movie List</Dropdown.Item>
                                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                            </Dropdown.Menu>:
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <div className='loginLink' onClick = {()=>navigate('/register')}>Login / Signup</div>
                                </Dropdown.Item>
                            </Dropdown.Menu>    
                        }  
                    </Dropdown>
                    <MovieListModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
                
            </nav>
    )
}

export default Navbar