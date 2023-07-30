import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { resendVerificationMail, verifyEmail } from '../utils/backend_api'
import './MailVerification.css'
import Button from 'react-bootstrap/esm/Button'
import MailVerificationMsg from '../components/MailVerificationMsg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MailVerification({setError, setUser}) {
    const {token} = useParams()
    const [isLinkExpired, setLinkExpiredState] = useState(false)
    const [verificationState, setVerificationState] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate('/')
    
    const notify = (msg) => toast.error(msg, {
        position: "top-right",  
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const emailVerification = async () => {
        console.log(token)
        const response = await verifyEmail(token)
        if(response.error)
            return setError(response.error)
        if(response.linkExpired)
            return setLinkExpiredState(true)
        localStorage.setItem('USER_TOKEN', response.token)
        localStorage.setItem('USERNAME', response.user.username)
        setUser(response.user)
        navigate('/', {replace:true})
    }   
    const resendMail = async (event) =>{
        event.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)){
            
            notify('Invalid email format!')
            return
        }
        
        const response = await resendVerificationMail(email)
        if(response.error)
            return setError(response.error)
        setVerificationState(true)
    }
    useEffect(()=>{
        emailVerification()
    },[])
  return (
    <div className='verification-container'>
        {
            verificationState &&
            <MailVerificationMsg email={email}/>
        }
        {
            !isLinkExpired && !verificationState &&
            <div className='content'>
                <h3>Verifying your mail...</h3>
                <FaSpinner/>
            </div>
        }
        {
            isLinkExpired && !verificationState &&
            <div className='content'>
                <h3>Verification link has expired. Please try again!</h3>
                <form onSubmit={(e) =>resendMail(e)} className='resend-form'> 
                    <input 
                        placeholder='Email Address' 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        className='resend-input'
                        required
                    />
                    <Button type='submit'>Resend</Button>
                </form>
            </div>
        }
    </div>
  )
}

export default MailVerification