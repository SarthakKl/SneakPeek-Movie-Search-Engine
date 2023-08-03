import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect, createContext} from 'react'
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import { getLikedMovies } from './utils/api/userApi'
import { getApi } from './utils/api/tmdbApi'
import Navbar from "./components/common/Navbar";
import MailVerification from "./pages/MailVerification";
import { ToastContainer } from "react-toastify";
import { validateToken } from "./utils/api/userApi";
import {userAxios} from './utils/api/userApi'
import ErrorModal from "./components/modals/ErrorModal";

export const MovieContext = createContext()
export const UserContext = createContext()
export const LikedMovieContext = createContext()

function App() {
	const [isSticky, setIsSticky] = useState(false);
	const [user,setUser] = useState(null)
	const [movies,setMovies] = useState([])
	const [likedMovie,setLikedMovie] = useState([])
	const [error, setError] = useState('')

	const fetchHomeMovies = async ()=>{
        const data = await getApi()
        setMovies(data)
    }
	const tokenValidation = async ()=>{
		const token = localStorage.getItem('USER_TOKEN'); 
		console.log(token)
		userAxios.defaults.headers.common['token']=token
		const response = await validateToken()
		if(response.error){
			return 
		}
		setUser(response.user)
	}
	useEffect(()=>{
		const handleScroll = () => {
			setIsSticky(window.scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll);
		fetchHomeMovies()
		tokenValidation()

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	},[])
  
	useEffect(()=>{
		console.log('user_changed',user)
		if(user){
			console.log(user)
			getLikedMovies(setLikedMovie)
			return 
		}
		console.log('user not found')
		setLikedMovie([])
	},[user])

	// useEffect(()=>{
	// 	console.log(movies)
	// }, [movies])

    return (
		<div className='main-container'>
			<ToastContainer/>
			<ErrorModal error={error} setError={setError}/>
			<UserContext.Provider value={user}>
				<MovieContext.Provider value={movies}>
					<LikedMovieContext.Provider value={likedMovie}>
						<BrowserRouter>
							<Navbar setUser={setUser} setMovies={setMovies} setError = {setError} isSticky = {isSticky}/>
							<Routes>
								<Route path="/" element={<Homepage  setLikedMovie={setLikedMovie} setError = {setError}/>} />
								<Route path='/register' element={<Register setUser={setUser} setError = {setError}/>}/>
								<Route path='/movie/:id' element={<MovieDetails setError = {setError}/>}/>
								<Route 
									path='/user/:username'  
									element={user?<Profile setError = {setError} setUser = {setUser}/>
												  :<Register setUser={setUser} setError = {setError}/>}
								/>
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
