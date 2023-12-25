// in our backend API folder, we create a models folder, then for our users, we create user.model
// this model is the created rules and requirements that the person has to follow to interact with our database and schema/variables/data

import mongoose from "mongoose";

// we now specify how certain fields are made up. The schema
// for the username, we use unique so no 2 users can have same username
// we do the same for email
// we use timestamps to see when users where created and updated

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
}, {timestamps:true});

// once we created the Schema, we create the model, in this case called User, we create it in the singular form, and mongo will automatically add the (s) to user -> users

const User = mongoose.model('User', userSchema);

// we then export the user so we can use it anywhere in our application

export default User;