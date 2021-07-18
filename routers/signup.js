let express = require('express');
const { User } = require('../models/user.model');
let router = express.Router();
const bcrypt = require ('bcrypt');

router.route('/')
.post(async function(req, res){
    try{
        
        const user = req.body;

        if (!(user.email && user.password && user.name)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all necessary details',
                user: {}
            })
        }

        let foundUser = await User.findOne({
            email: user.email
        })

        if(foundUser){
            res.status(400).json({
                success: false,
                message: 'Email id already exists',
                user: {}
            })
        }else{
            let password = user.password
            
            user.avatarUrl = `https://avatars.dicebear.com/api/jdenticon/${user.email}.svg`;

            // generate hash
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            
            const newUser = new User(user);
            const savedUser = await newUser.save()

            savedUser.password = null;

            res.status(200).json({
                success: true,
                message: 'User created successfully',
                user: savedUser
            })
            
        }
    
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Problem when adding user'
        })
    }
})

module.exports = router;