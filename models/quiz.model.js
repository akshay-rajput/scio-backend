const mongoose = require("mongoose");
const { Schema } = mongoose;
require('mongoose-type-url');

const quizSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
    },
    description: {
        type: String
    },
    questions: [
        {
            questionText: String,
            options: [
                {
                    optionText: String
                }
            ],
            correctOption: {
                type: Number,
                required: "Correct option is required for a question"
            }
        }
    ],
    pointsPerQuestion: Number
},
{
    timestamps: true,
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = { Quiz };

/*
    sample quiz

    quizId: "60cc4504c4b9e6224c10a236",
    const quiz = {
            name: "English Language Quiz",
            description: "Test your command over English with this quiz. Questions vary in difficulty, each correct answer grants you 10 points. Check out the leaderboard to see all time top scorers.",
            questions: [
                {
                    questionText: "What great shape she's in, and?",
                    options: [
                        {
                            optionText: "look at her good health"
                        },
                        {
                            optionText: "she looks healthy"
                        },
                        {
                            optionText: "she is looking healthy"
                        },
                        {
                            optionText: "what good health she has"
                        }
                    ],
                    correctOption: 4
                },
                {
                    questionText: "Kathy leads a stressful life ____ she has two jobs ___ is a single mom",
                    options: [
                        {
                            optionText: "because of / and"
                        },
                        {
                            optionText: "although / but"
                        },
                        {
                            optionText: "either / or"
                        },
                        {
                            optionText: "because / and"
                        }
                    ],
                    correctOption: 4
                },
                {
                    questionText: "The program has taught Kevin how to prioritize her responsibilities and ___",
                    options: [
                        {
                            optionText: "what to do about stressful situations"
                        },
                        {
                            optionText: "what to do in stressful situations"
                        },
                        {
                            optionText: "when he must leave stressful situations"
                        },
                        {
                            optionText: "that he is a good person"
                        }
                    ],
                    correctOption: 2
                },
                {
                    questionText: "Drying flowers is the best way _____ them",
                    options: [
                        {
                            optionText: "preserve"
                        },
                        {
                            optionText: "to preserve"
                        },
                        {
                            optionText: "preserving"
                        },
                        {
                            optionText: "by preserving"
                        }
                    ],
                    correctOption: 2
                },
                {
                    questionText: "Many American Universities ____ as small, private colleges",
                    options: [
                        {
                            optionText: "beginning"
                        },
                        {
                            optionText: "for the beginning"
                        },
                        {
                            optionText: "began"
                        },
                        {
                            optionText: "begun"
                        }
                    ],
                    correctOption: 3
                },
                {
                    questionText: "The upper branches of the tallest trees produce more leaves ____ other branches",
                    options: [
                        {
                            optionText: "than it does"
                        },
                        {
                            optionText: "than do"
                        },
                        {
                            optionText: "than they do"
                        },
                        {
                            optionText: "than does"
                        }
                    ],
                    correctOption: 2
                },
                {
                    questionText: "Since 1970's, riding bicycles ______ in the United States ",
                    options: [
                        {
                            optionText: "has become increasingly widespread"
                        },
                        {
                            optionText: "become increasingly widely spread"
                        },
                        {
                            optionText: "has increased and becomes spread widely"
                        },
                        {
                            optionText: "becomes increasingly widespread"
                        }
                    ],
                    correctOption: 1
                },
                {
                    questionText: "Horseradish is a large root that is grated _____ a spicy food sauce.",
                    options: [
                        {
                            optionText: "to making"
                        },
                        {
                            optionText: "to make"
                        },
                        {
                            optionText: "to be made"
                        },
                        {
                            optionText: "to the making"
                        }
                    ],
                    correctOption: 2
                },
                {
                    questionText: "Vitamin A maintains the sharpness of human vision ____ and promotes healthy bones",
                    options: [
                        {
                            optionText: "for the night"
                        },
                        {
                            optionText: "night time"
                        },
                        {
                            optionText: "at night"
                        },
                        {
                            optionText: "of the night"
                        }
                    ],
                    correctOption: 3
                },
                {
                    questionText: "What is figurative language?",
                    options: [
                        {
                            optionText: "new words"
                        },
                        {
                            optionText: "literal expressions"
                        },
                        {
                            optionText: "facts and sources"
                        },
                        {
                            optionText: "non-literal expressions"
                        }
                    ],
                    correctOption: 4
                }
            ],
            pointsPerQuestion: 10
        }
        
*/