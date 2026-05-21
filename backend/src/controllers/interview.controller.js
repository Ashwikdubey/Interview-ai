const pdfParse=require("pdf-parse")
const generateInterviewReport=require("../services/ai.service")
const interviewreportModel=require("../models/interviewReport.model");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req,res){
    const resumeContent=await(new pdfParse.PDFParse(Uint8Array.from(req.file.buffer)).getText());
    const {selfDescription, jobDescription}=req.body

    const interviewReportByAi= await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription:selfDescription,
        jobDescription:jobDescription
    })

    const interviewReport=await interviewreportModel.create({
        user:req.user.id,
        resumeText:resumeContent.text,
        selfDescription:selfDescription,
        jobDescription:jobDescription,
        technicalQuestions:interviewReportByAi.technicalQuestions,
        behavioralQuestions:interviewReportByAi.behavioralQuestions,
        skillGaps:interviewReportByAi.skillGaps,
        matchScore:interviewReportByAi.matchScore,
        preparationPlan:interviewReportByAi.preparationPlan,
        title:interviewReportByAi.title
    })

    return res.status(201).json({
        message:"interview report generated successfully",
        report:interviewReport
    })
}

async function getInterviewReportByIdController(req,res){
    try{
    const report=await interviewReportModel.findOne({_id:req.params.interviewId,user:req.user.id})
    console.log(req.params.id)
    if(!report){
        return res.status(404).json({
            message:"report not found"
        })
    }
    res.status(200).json({
        message:"report fetched successfully",
        report
    })
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

async function getAllInterviewReportController(req,res){
    try{
    const reports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("title");
    res.status(200).json({
        message:"reports fetched succesfully",
        reports
    })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
module.exports={generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportController}