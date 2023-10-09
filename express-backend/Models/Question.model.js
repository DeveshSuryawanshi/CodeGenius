const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    question : String,
    techStack : String
},{
    versionKey : false
})

const QuestionModel = mongoose.model("question", QuestionSchema);

module.exports = {
    QuestionModel
}