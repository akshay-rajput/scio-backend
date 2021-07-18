let express = require('express');
const { Result } = require('../models/result.model');
const {extend} = require('lodash')
let router = express.Router();

// results route
router.route('/')
.get(async function(req, res){
    
    let allResults = [];

    if(req.headers.userid){
        console.log('find result for user: ', req.headers.userid);
    
        try{
            allResults = await Result.find({user: req.headers.userid}).populate([
                {path: 'user', model: "User", select:["_id","name", "avatarUrl"]},
                {path: 'quiz', model: "Quiz"}
            ])  
        }
        catch(error){
            res.status(400).json({
                success: false,
                error: error.message,
                message: "Couldn't get results"
            })
        }
    }
    else{
        console.log('getting all results');
        try{
            allResults = await Result.find({}).populate([
                {path: 'user', model: "User", select:["_id","name", "avatarUrl"]},
                {path: 'quiz', model: "Quiz"}
            ])
        }
        catch(error){
            console.log("error getting all resulst: ", error.message);
            res.status(400).json({
                success: false,
                error: error.message,
                message: "Couldn't get results"
            })
        }
    }

    // sort by date
    allResults.sort((result, nextResult) => nextResult.createdAt - result.createdAt);
    
    res.status(200).json({
        success: true,
        results: allResults
    })

}).post(async function(req, res){
    try{
        const result = req.body
        
        // console.log('result: ', result)
        const newResult = new Result(result);
        // console.log('newResult is : ', newResult)
        const savedResult = await newResult.save()

        res.status(200).json({
            success: true,
            message: "Result created successfully!",
            result: savedResult
        })
    }catch(error){
        console.log('\n error:', error + '\n')
        res.status(500).json({
            success: false,
            message: 'Cannot add result',
            error: error.message
        })
    }
})

// middleware for RUD ops for single result
router.param("quizId", async (req, res, next, quizId) => {
    try{
        const result = await Result.find({quiz: quizId}).populate([
                {path: 'user', model: "User", select:["_id","name", "avatarUrl"]},
                {path: 'quiz', model: "Quiz"}
            ])

        if(!result){
            return res.status(404).json({
                success: false,
                message: "Result not found"
            })
        }
        // set result inside req object to use below 
        req.result = result;
        next();
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error getting result, please check your request"
        })
    }
})

// single post
router.route('/:quizId')
.get((req, res) => {
    // take post out of req object
    let {result} = req

    res.status(200).json({
        success: true,
        result: result
    })
    
})
.post(async (req, res) => {
    // version causing problems with update
    delete req.body.__v;
    // the post date passed by client
	const resultUpdate = req.body

    // the result which was found by id
    let {result} = req;

    result = extend(result, resultUpdate);

    try{
        result = await result.save();

        let fullResult = await result.populate([
            {path: 'user', model: "User", select:["_id","name", "avatarUrl"]},
            {path: 'quiz', model: "Quiz"}
        ]).execPopulate();

        res.status(200).json({
            success: true,
            message: "Result updated successfully",
            result: fullResult
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while saving result"
        })
    }
})
.delete(async (req, res) => {
    let {result} = req
    
    try{
        await result.remove()
        res.status(200).json({
            success: true,
            deleted: true,
            message: "Result deleted successfully!",
            result
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while deleting result"
        })
    }
})

module.exports = router;