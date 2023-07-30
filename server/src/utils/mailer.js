const jwt = require('jsonwebtoken')
const { sendEmail } = require('./mailService');

const sendVerificationMail = async (email,username)=>{
    try {
        
        console.log("Email :" + email+" Username : "+username);

        const token = await jwt.sign({email,username},process.env.SECRET_KEY,{ expiresIn: 600 })

        const link = process.env.FRONTEND_URL +`/api/mail-verification/`+token

        const response = await sendEmail(email,username,link,"OTP-Verification for Movie-Search-Engine");
    
        return response;
    } 
    catch (error) {
        console.log("Error occurred : ", error);
        return {
            error:error?.message
        };
    }
}
module.exports = {sendVerificationMail}
