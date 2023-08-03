import {React,useContext,useEffect,useNavigate, useState} from 'react'
import LikedMovieList from '../components/homepage/LikedMovieList'
import axios from 'axios'
import {changePassword as changePass} from '../utils/api/userApi'
import './Profile.css'
import { UserContext } from '../App'
import Register from './Register'

function Profile({setError}) {
    const user = useContext(UserContext)
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    console.log(user)
    
    const changePassword = async ()=>{
        if(newPass !== confirmPass)
            alert("Password doesn't match")
        else{
            try {
                const response = await changePass(oldPass, newPass)
                alert(response?.message || response?.error)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div>
            <div className='profile-page'>
                <div className='userDetails'>
                    <h1 className='userName'>{user?.username}</h1>
                    <h3 className='userEmail'>{user?.email}</h3>
                    <div className='changePassword'>
                    
                        <h4>Change Password</h4>
                       
                        <input 
                            name='oldPass'
                            type="password"
                            placeholder='Old Password'
                            value={oldPass}
                            onChange={(e)=>setOldPass(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='New Password'
                            value={newPass}
                            onChange={(e)=>setNewPass(e.target.value)}
                        
                        />
                        <input
                            type="password" 
                            placeholder='Re-enter New Password'
                            value={confirmPass}
                            onChange={(e)=>setConfirmPass(e.target.value)}
                        />
                        <button className='changeBtn' onClick={changePassword}>Change Password</button>
                    
                    </div>
                </div>
                <div className='movieList'>
                    <LikedMovieList/>
                </div> 
            </div>
        </div>
    )
}

export default Profile