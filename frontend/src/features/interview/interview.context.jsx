import {createContext,useState} from "react";

export const interviewContext=createContext();

export const InterviewProvider=({children})=>{
    const[report,setReport]=useState(null);
    const[reports,setReports]=useState([]);
    const[loading,setLoading]=useState(false);
    return(
        <interviewContext.Provider value={{ report, setReport, loading, setLoading, reports, setReports }}>
            {children}
        </interviewContext.Provider>
    )
}