import { useContext, useEffect } from "react";
import { generateReport,getAllInterviewReports,getInterviewReportbyId } from "../services/interview.api";
import { interviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview=()=>{
    const context=useContext(interviewContext)
    const {interviewId}=useParams()
const {loading,setLoading,report,setReport,reports,setReports}=context

const handleGenerateReport=async ({resume,selfDescription,jobDescription})=>{
    setLoading(true)
    let response=null;
    try{
    response=await generateReport({resume,selfDescription,jobDescription})
    setReport(response.report)
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false);
    }
    return response
}
const handleGetReportByID=async({interviewID})=>{
    setLoading(true)
    let response=null;
    try{
        response=await getInterviewReportbyId(interviewID);
        setReport(response.report)
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    return response
}
const handleGetAllInterviewReports=async()=>{
    setLoading(true)
    let response=null;
    try{
        response=await getAllInterviewReports()
        setReports(response.reports)
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    return response
}
useEffect(()=>{
    if(interviewId){
        handleGetReportByID({interviewID:interviewId})
    }
    else{
        handleGetAllInterviewReports()
    }
},[interviewId])
return {loading,report,reports,handleGenerateReport,handleGetAllInterviewReports,handleGetReportByID}
}