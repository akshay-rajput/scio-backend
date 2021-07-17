let express = require('express');
const { Quiz } = require('../models/quiz.model');
const {extend} = require('lodash')
let router = express.Router();

// quiz route
router.route('/')
.get(async function(req, res){
    try{
        // const allQuizzes = await Quiz.find({}).populate([{path: 'publisher likes.likedByUser comments.commentByUser', model: "User", select:["_id","name","username", "avatarUrl"]} ]);
        const allQuizzes = await Quiz.find({});

        res.status(200).json({
            success: true,
            quizList: allQuizzes
        })
        
    }catch{ error => {
            res.status(500).json({
                success: false,
                error: error.message,
                message: 'Cannot get quizzes'
            })
        }
    }

}).post(async function(req, res){
    try{
        const quiz = req.body;
        
        // console.log('post: ', post)
        const newQuiz = new Quiz(quiz);
        // console.log('newQuiz is : ', newQuiz)
        const savedQuiz = await newQuiz.save()

        res.status(200).json({
            success: true,
            message: "Quiz created successfully!",
            quiz: savedQuiz
        })
    }catch(error){
        console.log('\n error:', error + '\n')
        res.status(500).json({
            success: false,
            message: 'Cannot add quiz',
            error: error.message
        })
    }
})

// middleware for RUD ops for single post
router.param("quizId", async (req, res, next, quizId) => {
    try{
        const quiz = await Quiz.findById(quizId);

        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            })
        }

        // let fullPost = await post.populate([{path: 'publisher likes.likedByUser comments.commentByUser', model: "User", select:["_id","name","username", "avatarUrl"]} ]).execPopulate();

        // set post inside req object to use below 
        req.quiz = quiz;
        // req.fullPost = fullPost;
        next();
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error getting quiz, please check your request"
        })
    }
})

// single post
router.route('/:quizId')
.get((req, res) => {
    // take post out of req object
    // let {fullPost} = req
    let {quiz} = req;

    res.status(200).json({
        success: true,
        quiz: quiz
    })
    
})
.post(async (req, res) => {
    // version causing problems with update
    delete req.body.__v;
    // the post date passed by client
	const quizUpdate = req.body

    // the post which was found by id
    let {quiz} = req

    quiz = extend(quiz, quizUpdate)

    try{
        quiz = await quiz.save()

        res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            quiz: quiz
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while saving quiz"
        })
    }
})
.delete(async (req, res) => {
    let {quiz} = req
    
    try{
        await quiz.remove()
        res.status(200).json({
            success: true,
            deleted: true,
            message: "Quiz deleted successfully!",
            quiz
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while deleting quiz"
        })
    }
})

module.exports = router;