import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

// this comment is tied into the SAVE function of a new user below, because we used AWAIT, we must use ASYNC to wait until new user has been saved
export const signup = async (req,res, next) => {
    // here we get all the information from our database, in this case INSOMNIA
    const {username, email, password} = req.body;
    // below we encrypt the user's password
    // we also then use the hashed password instead of default password in our information save
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // below we save the data as a new user in our database
    const newUser = new User({username, email, password : hashedPassword});
    // we add the try for code that might throw an error/exception
    try {
        // saving a new user takes time, so to prevent error, we use AWAIT until the saving finishes
        await newUser.save();
        // we then respond with status 201, which means something was created
        res.status(201).json("User created successfully");
    } catch (error){
        // next(errorHandler(550, "manual error from the function"));
        next(error);
    }
    
    };

export const signin = async (req, res, next) =>{
    const {email, password} = req.body;
    try{
        // the line below checks if the user exists with our user.model in our database
        // after findone we have to specify what we are searching, and we could actually delete one of the "email" words in the findOne params after ES6?
const validUser = await User.findOne({email:email});
        if (!validUser) return next(errorHandler(404, "User not actually found!"));
        // to match the visible password entered by user with the stored hashed password, we use a special bcrypt function
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errrorHandler(401, "Wrong Credentials!"));
        // below we add a token we know a user with valid login creds is on the website, and if they need to make changes
        // the JWT secret is another way to salt the cookie
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET,);
        // below we "destructure" the data, because we dont want to send the password back to the user
        const {password: pass, ...rest} = validUser._doc;
        res
        // below we actually create the cookie and insert our token into it
        // the http only means no other application can use our cookie
        .cookie('access_token', token, {httpOnly:true})
        .status(200)
        .json(rest)
    } catch(error){
        next(error);
    }
}

