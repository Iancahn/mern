import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import {errorHandler} from '../utils/error.js';

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

// //test version
// export const signup = (req, res) => {
//    console.log(req.body);
// };

