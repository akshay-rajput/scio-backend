const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
    id: Schema.Types.ObjectId,
    quiz: {
        type: Schema.Types.ObjectId, 
        ref: "Quiz",
        required: "Quiz Id is required for result"
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: "User Id is required for result"
    },
    correctAnswers: Number,
    wrongAnswers: Number,
    score: {
        type: Number,
        required: "Score is needed for result of quiz."
    }
},
{
    timestamps: true,
});

const Result = mongoose.model("Result", resultSchema);

module.exports = { Result };

// sample result
/* 
    quiz: "60f2f423414e7622fc5a997b",
    user: "60cc4615e538e920ccb68a3a",
    correctAnswers: 7,
    wrongAnswers: 3,
    score: 70

*/