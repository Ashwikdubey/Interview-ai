import axios from "axios";

const api=axios.create({
    baseURL:"https://interview-ai-tj8w.onrender.com",
    withCredentials:true  //for including cookies in req
})

export async function register({username,email,password}){
    try{
        const response =await api.post("/api/auth/register",{
        username,email,password
    }) 
    return response.data
    }
    catch(err){
        console.log(err);
    } 
}

export async function Login({email,password}){
    try{
        const response=await api.post("/api/auth/login",{
            email,password
        })
        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
    const response=await api.get("/api/auth/logout")
    return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function getMe(){
    try{
        const response =await api.get("/api/auth/get-me")
        return response.data
    }
    catch(err){
        console.log(err);
    }
}