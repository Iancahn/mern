// we call this logic controller, its the the function file to be used in routes
// this controller is called by our user.route to display a message that our API route is working

import { errorHandler } from "../utils/error.js";

import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req,res) => {
    res.json(
        {message:"Api Route is working"},
    );
};


export const updateUser = async (req, res, next) =>{
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
           $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
           } 
        }, {new: true})

        const {password, ...rest} = updatedUser._doc

        res.status(200).json(rest);
}catch(error){
    next(error);
}
};