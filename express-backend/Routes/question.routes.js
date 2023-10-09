const express = require("express");
const {QuestionModel} = require("../Models/Question.model");

const QuestionRouter = express.Router();

QuestionRouter.post("/add", async(req, res) =>{
    try {
        const NewQuestion = new QuestionModel(req.body);
        await NewQuestion.save();
        res.status(200).json({msg : "New Question has been Added"});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
})

QuestionRouter.get("/get", async(req, res) =>{
    const techStack = req.query.techStack;
    try {
        const Questions = await QuestionModel.find({techStack});
        res.status(200).json(Questions);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

module.exports={
    QuestionRouter
}