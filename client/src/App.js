import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect, createContext} from 'react'

import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import { getLikedMovies } from './utils/movieInDB'
import { getApi } from './utils/tmdbApi'
import Navbar from "./components/Navbar";
import MailVerification from "./pages/MailVerification";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import warningImg from './assets/warning.png'
import { ToastContainer } from "react-toastify";


export const MovieContext = createContext()
export const UserContext = createContext()
export const LikedMovieContext = createContext()
function App() {

	const [user,setUser] = useState(null)
	const [movies,setMovies] = useState([])
	const [likedMovie,setLikedMovie] = useState([])
	const [error, setError] = useState('')

	const fetchHomeMovies = async ()=>{
        const data = await getApi()
        setMovies(data)
    }

	useEffect(()=>{
		fetchHomeMovies()
		const user = localStorage.getItem('user');
		
		setUser(JSON.parse(user))
	},[])
  
	useEffect(()=>{
		console.log(movies)
	}, [movies])

	useEffect(()=>{
		console.log('user_changed',user)
		if(user){
			getLikedMovies(setLikedMovie)
			console.log('userfound')
			return
		}
		setLikedMovie([])
		console.log('user not found')
	},[user])

    return (
		<div className='main-container'>
			<ToastContainer/>
			<Modal
				size="m"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={error}
				scrollable={false}
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						<img src = {warningImg} className='warning-icon' alt=''/>
						<span>Error</span>
					</Modal.Title> 
				</Modal.Header>
				<Modal.Body style={{ overflowY: 'auto'}}>
					{error}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={()=>setError('')} variant='danger'>Close</Button>
				</Modal.Footer>
			</Modal>
			<UserContext.Provider value={user}>
				<MovieContext.Provider value={movies}>
					<LikedMovieContext.Provider value={likedMovie}>
						<BrowserRouter>
							<Navbar setUser={setUser} setMovies={setMovies} setError = {setError}/>
							<Routes>
								<Route path="/" element={<Homepage  setLikedMovie={setLikedMovie} setError = {setError}/>} />
								<Route path='/register' element={<Register setUser={setUser} setError = {setError}/>}/>
								<Route path='/movie/:id' element={<MovieDetails setError = {setError}/>}/>
								<Route path='/user/:username'  element={<Profile setError = {setError}/>}/>
								<Route path='/api/mail-verification/:token' element={<MailVerification setError = {setError} setUser={setUser}/>} />
							</Routes>
						</BrowserRouter>
					</LikedMovieContext.Provider>	
				</MovieContext.Provider>
			</UserContext.Provider>
		</div>
    )
}
export default App;
