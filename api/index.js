// install react, tailwind
// install vite - vite is some bundler that makes installing react easier???
// we then configure tailwind config file, then we replace index.css content that applies base tailwind classes

// this is our backend index.js file setup
// we install express
// thats why we import express here
// we then create the app using const app
// then we listen to a certain port number
// if we can listen to the post, we will use the callback function to tell us we can listen to the port
// we will get express error of type module, because we use import in our backend index. So in our package.json, we added the type module
// then we install nodemon , so our package.json will update to show nodemon in the dev script

// we need to parse a cookie to update user info
// we then install cookie-parser via NPM
// we then need to initialize cookie-parser in the index.js file

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";

dotenv.config();

// below is how we know we actually connected to our database
// we also use the ENV to hide our secret password to our Mongo
// remember to add the .env in our gitignore file
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Mongo is working");
}).catch((err) => {
    console.log("The error is:" + err);
});

const app = express();

//alow JSON as input on server

app.use(express.json()); 
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Skynet might be running on port 3000!");
    }
);

// in a previous version we used app.get to send a request, then get back a response.
// in this previous version we had a res.send("message here") come pack as response, then when you access /test, we would get that response

// all routes must be defined in index.js
// anytime someone visits api/user use the route we created = in this case user.route
// we also describe the routes with the name/classs/protocol we want to use, so when we add more features, we understand what routes are being used clearly.
// this way all our functions are explained in our routes, which access it in controllers, instead of blowing up our index.js file - like react components basically
// so from index, we use app.use, to call a route, then inside that route, we use the function we call in via a controller

app.use("/api/user", userRouter);

// this auth will be used in our signup process
// i now noted that the auth in the api/auth is the name before the .route.js part

app.use("/api/auth", authRouter);

// below we use next to go to the next middleware
// first var below is the err we send to the middleware
// we use next to go to the next middleware
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json ({
        success:false,
        statusCode,
        message,
    });
})