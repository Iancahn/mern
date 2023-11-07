import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Our Mongo has connected to the DB");
}).catch((err) => {
    console.log(err);
}
);


const app = express();

app.listen(3000, () => {
    console.log("Skynet might be running on port 3000");
    }
);

app.use("/api/user", userRouter);