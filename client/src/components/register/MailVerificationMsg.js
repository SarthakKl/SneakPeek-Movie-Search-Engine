import React from 'react'
import './MailVerificationMsg.css'

function MailVerificationMsg({email}) {
    
  return (
    <div className="verification-msg-container">
        <div className='verification-title'>A verification link has been sent to your email account</div>
        <p className='verification-body'>
            Please click on the link that has just been sent to your email 
            account to verify your email and continue the registration process.
            You can close this window.
        </p>
    </div>
  )
}

export default MailVerificationMsg