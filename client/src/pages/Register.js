import React, { useContext } from 'react'
import {useState} from 'react';
import './Register.css'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../App';
import { useEffect } from 'react';
import {login as userLogin, signup as userSignup} from '../utils/backend_api'
import MailVerificationMsg from '../components/MailVerificationMsg';
import CustomSpinner from '../components/CustomSpinner';


function Register({setUser, setError}) {
    const [userName,setUsername] = useState("");
    const [email,setEmail] = useState("sarthakk60@gmail.com");
	const [password,setPassword] = useState("123");
	const [login,setLogin] = useState(true);
	const user = useContext(UserContext)
	const [loading, setLoading] = useState(false)
	const [verifcationState, setVerificationState] = useState(false)
    const navigate = useNavigate();

	const logHandler = async(e)=>{
		e.preventDefault();
		if(!email || !password) return;
		if(login){
			setLoading(true)
			console.log("Logging in...")
			const response = await userLogin(email, password)
			setLoading(false)
			console.log(response)
			if(response.error)
				return setError(response.error)
			if(!response.isVerified)
				return setVerificationState(true)
			localStorage.setItem('USER_TOKEN', response.token)
			localStorage.setItem('USERNAME', response.user.username)
			setUser(response.user)
		}
		else{
			if(!userName) return;
			setLoading(true)
			const response = await userSignup(userName, email, password)
			setLoading(false)
			console.log(response)
			if(response.error)
				return setError(response.error)
			setVerificationState(true)
		}
	}
	useEffect(()=>{
		if(user){
			navigate('/',{replace:true})
		}
	},[user])
  return (

    <div className='registerContainer'>
		{
			loading && 
			<CustomSpinner/>
		}
		{
			verifcationState &&
			<MailVerificationMsg email={email}/>
		}
		{
			!verifcationState &&
			<div>
				<div className='nameForm'>
					<h1 className='login-heading'>{login?"Login":"SignUp"}</h1>
					{!login && 
					<input
						type="text"
						value={userName}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
					/>
					}
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
					<button className='btn btn-primary my-2' type="submit" onClick={logHandler}>{(login)?"Sign In":"Sign Up"}</button>
					{
						login ? 
						<div className='form-footer'>
							Don't have an account? <span onClick={()=>setLogin(!login)}>Register</span>
						</div>:
						<div className='form-footer'> 
							Already have an account? <span onClick={()=>setLogin(!login)}>Login</span>
						</div>
					}
				</div>
			</div>
		}
    </div>
  )
}

export default Register