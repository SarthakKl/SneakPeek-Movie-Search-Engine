import axios from 'axios'

const uri="http://localhost:5000/api"
// const uri= "https://movie-search-engine-backend.vercel.app";

const mainAxios = axios.create({baseURL:uri,})

export const login = async (email, password) => {
    try {
        const response = await mainAxios({
            url:'/login',
            method:'post',
            data:{
                email, 
                password
            },
        })
        console.log(response)
        if(response.data.error)
            return {error:response.data.error}
        return response.data
    } catch (error) {
        console.log(error)
        return {
            error:error?.message
        } 
    }
}
export const signup = async (username, email, password) => {
    try {
        const response = await mainAxios({
            url:'/signup',
            method:'post',
            data:{
                username, email, password
            }
        })
        console.log(response)
        if(response.data.error)
            return {error:response.data.error}
        return response.data
    } catch (error) {
        console.log(error)
        return {
            error:error?.message
        } 
    }
}
export const verifyEmail = async (token) => {
    try {
        const response = await mainAxios({
            url:'/verify-email',
            method:'post',
            data:{
                token:token
            }
        })
        if(response.data.error)
            return {error:response.data.error}
        return response.data
    } catch (error) {
        return {error:error?.message}
    }
}
export const resendVerificationMail = async (email) => {
    try {
        const response = await mainAxios({
            url:'/resend-verification-mail',
            method:'post',
            data:{
                email:email,
            }
        })
        if(response.data.error)
            throw Error(response.data.error)
        return response.data
    } catch (error) {
        console.log(error)
        return {error:error?.message}
    }
}

