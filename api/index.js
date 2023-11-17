import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Mongo is !wsorking");
}).catch((err) => {
    console.log("The error is:" + err);
});

const app = express();

app.use(express.json()); //alow JSON as input on server

app.listen(3000, () => {
    console.log("Skynet might be running on port 3000");
    }
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json ({
        success:false,
        statusCode,
        message,
    });
})