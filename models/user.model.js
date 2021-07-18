const mongoose = require("mongoose");
const { Schema } = mongoose;
require('mongoose-type-url');

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: "User cannot be added without a name",
        minLength: [2, "Name should be atleast 2 character long"] 
    },
    email: {
        type: String,
        unique : true,
        required: "User cannot be added without an email" 
    },
    password: {
        type: String,
        required: "User cannot be added without password",
        minLength: [6, "Password should be atleast 6 character long"]
    },
    avatarUrl: {
        type: mongoose.SchemaTypes.Url,
        message: "Avatar needs a proper url"
    }
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };


/*
    sample user json

    "name": "akshay",
    "email": "test@test.com",
    "password": "tester",
    "avatarUrl": "https://avatars.dicebear.com/api/jdenticon/3.svg"

*/