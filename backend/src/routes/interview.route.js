const express=require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController=require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter=express.Router();

/**
 * @route POST api/interview
 * @description generate new interview report based on user resume pdf,self desc and job desc
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET api/interview/:interviewId
 * @description get interview report by id
 * @access private
 */

interviewRouter.get("/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController);

/**
 * @route get api/interview/getReport
 * @description get all reports
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportController);

module.exports=interviewRouter;