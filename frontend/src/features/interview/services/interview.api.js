import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export const generateReport=async function({resume,selfDescription,jobDescription}){
    try{
        const formData=new FormData();
        formData.append("resume",resume)
        formData.append("selfDescription",selfDescription)
        formData.append("jobDescription",jobDescription)
        const response=await api.post("/api/interview/",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data
    }
    catch(err){
        return err.message
    }
}

export const getInterviewReportbyId=async (interviewId)=>{
    try{
        const reponse=await api.get(`/api/interview/${interviewId}`)
        return reponse.data
    }
    catch(err){
        return err.message
    }
}

export const getAllInterviewReports=async ()=>{
    try{
    const response=await api.get("/api/interview/")
    return response.data
    }
    catch(err){
        return err.message
    }
}