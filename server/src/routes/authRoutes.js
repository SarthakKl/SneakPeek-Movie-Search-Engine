const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { sendVerificationMail } = require('../utils/mailer')
const jwt = require('jsonwebtoken') 

router.post('/verify-email', async (req, res)=>{
    try {
        const token = req.body.token
        console.log(token)
        const result = jwt.verify(token, process.env.SECRET_KEY)
        console.log(result)
        await User.updateOne({email:result.email}, {$set:{isVerified:true}})
        const user = await User.findOne({email:result.email})
        console.log(user)
        const authToken = user.genAuthToken()

        return res.status(200).json({
            message:'Verified Successfully',
            token:authToken,
            user,
            linkExpired:false,
            error:null
        })
        
    } catch (error) {
        console.log(error)
        if(error.message==='jwt expired')
            return res.json({
                message:'Verification link expired',
                linkExpired:true,
                error:null
            })
        return res.json({
            error:error.message
        })
    }
})
router.post('/resend-verification-mail', async (req, res)=>{
    try {
        console.log('Resending mail..')
        const email = req.body.email
        const user = await User.findOne({email:email})
        if(!user)
            throw Error('User not found')
        if(user.isVerified)
            throw Error('User is already verified')
        
        const response = await sendVerificationMail(req.body.email,user.username);

        if(response.error)
            throw Error(response.error)
            
        return res.json({
            error:null,
            message:"Verfication email has been sent to your email",
            mailSent:true
        })
    } catch (error) {
        console.log(error)
        return res.json({
            error:error.message
        })
    }
})
router.post('/login',async(req,res)=>{
    //check if user exist then match password then return user with token
    console.log(req.body)
    const user = await User.findOne({email:req.body.email});
    
    if(!user){
        res.json({
            error:"user not found",
            status_code:401
        })
    }
    //match passowrd
    const passCorrect = User.verifyPass(req.body.password,user.password)
    if(!passCorrect){
        return res.json({
            error:"Password is incorrect"
        })
    }
    console.log(user.isVerified)
    if(!user.isVerified){
        const response = await sendVerificationMail(req.body.email,user.username);

        if(response.error){
            return res.json({
                error:response.error
            })
        }
        return res.json({
            error:null,
            message:"Verfication email has been sent to your email",
            isVerified:false
        })
    }
    const token = await user.genAuthToken()

    res.json({
        token,
        user,
        error:null,
        isVerified:true,
        message:'Successfully logged in'
    })
})
router.post('/signup',async(req,res)=>{

    try {
        const alreadyUser = await User.findOne({email:req.body.email});

        if(alreadyUser){
            return res.json({
                error:"User already exists",
                data:alreadyUser.email
            })
        }
        //create user
        const password = await User.genHashPass(req.body.password);

        const user =new User({
            username: req.body.username,
            email:req.body.email,
            password:password
        })
        
        await user.save();
        
        const response = await sendVerificationMail(req.body.email,user.username);   

        if(response.error){
            return res.json({
                error:response.error
            })
        }
        return res.json({
            message:"Account created. Verification link has been sent to the mail.",
            error:null
        })

    } catch (error) {
        console.log(error);
        return res.json({
            error:error.message
        })
    }
})

module.exports = router