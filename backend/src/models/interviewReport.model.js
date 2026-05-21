const mongoose=require("mongoose");

/**
 * -job description scehema
 * -resume text
 * self description
 * 
 * matchScore
 * 
 * -technical questions
 * -behavioral questions
 * -skill gaps
 * -prep plan
 */

const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }    
})
const behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }    
})
const skillgapsSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:true
    }
})
const prepPlanSchema=new mongoose.Schema({
  day:{
    type:Number,
    required:true
  },
  focus:{
    type:String,
    required:true
  },
  tasks:[{
    type:String,
    required:true
  }] 
})

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"jobDescription is required"]
    },
    resumeText:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillgapsSchema],
    preparationPlan:[prepPlanSchema],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    title:{
        type:String
    }
},{timestamps:true})

const interviewReportModel=mongoose.model("interview report",interviewReportSchema)

module.exports=interviewReportModel;
