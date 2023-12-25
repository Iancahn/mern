// auth is used in our signup process

import express from "express";
import {signup, signin, google} from "../controllers/auth.controller.js";

const router = express.Router();

// instead of a GET request, we have a POST request
// then we create an AUTH controller for our functionality

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;