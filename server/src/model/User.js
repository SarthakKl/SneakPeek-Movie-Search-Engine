const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    likedMovie:[
        {
            id:Number,
            title: String,
            rating: Number,
            genre:[
                
            ]
        }
    ]
})
// userSchema.pre('save', function(){
//     if(this.isModified('password')){

//     }
// })

userSchema.statics.genHashPass = (password)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(password);
    const hashedPass = bcrypt.hashSync(password, salt);
    return hashedPass;
}
userSchema.statics.verifyPass =async (newPass, oldPass)=>{
    return await bcrypt.compare(newPass,oldPass);
}
userSchema.methods.genAuthToken =  function () {
    const user = this
    console.log(this)
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    return token
}
const User = mongoose.model('User',userSchema)

module.exports = User;
