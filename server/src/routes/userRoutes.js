const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../model/User');

router.use('/', (req, res, next)=>{
    try {
        if(!req.headers.token)
            throw Error('Token not found')
        const response = jwt.verify(req.headers.token,process.env.JWT_SECRET);
        req.userId = response._id;
        next()
    } catch (error) {
        console.log(error)
        return res.json({
            error:error.message
        })
    }
})
router.put('/change-password',async (req,res)=>{
    try {
        console.log("pasword change clicked")

        const user = await User.findOne({_id:req.userId});
        const passCorrect = await User.verifyPass(req.body.oldPass,user.password)
        if(passCorrect){
            user.password = User.genHashPass(req.body.newPass);
        }
        user.save();
        res.json({
            message:"Password has been changed",
            error:null,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            error:error.message
        })
    }
})
router.post('/saveMovie', async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.userId})
        const movie = {
            id:req.body.id,
            title:req.body.title,
            rating:req.body.rating,
            genre:req.body.genre
        }
        user.likedMovie.push(movie);
        await user.save();
        res.json({
            status:"success",
            data:user.likedMovie,
            error:null
        })
            
    } catch (err) {
        console.log(err);
        res.json({
            status:"Failed",
            message:"Internal Server Error",
            data:null,
            error:error
        })
    }
})

router.delete('/delMovie', async(req,res)=>{
    try {
        console.log("Delete movie");
        const user = await User.findOne({_id:req.userId});

        const movieIndex = user.likedMovie.findIndex((item)=>item.id===req.body.movieId)
        console.log(user.likedMovie.length);
        
        await user.likedMovie.splice(movieIndex,1);
        await user.save();
        console.log(user.likedMovie.length);
        res.json({
            message:"del",
            error:null
        })

    } catch (error) {
        res.json({
            message:"Error happend",
            error:error
        })
    }
    
})

router.get('/getLikedMovies', async(req,res)=>{
    
    try {
        console.log('Getting liked movies')
        const user = await User.findOne({_id:req.userId});
        res.json({
            message:"Liked Movies found",
            data: user.likedMovie,
            error:null
        })
    } catch (error) {
        console.log(error)
        res.json({
            error:"Internal Server Error",
            data:null,
        })
    }
})

module.exports = router
