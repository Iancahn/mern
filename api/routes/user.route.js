// routes refer to the defined paths on your server that correspond to specific HTTP methods (e.g., GET, POST, PUT, DELETE).
// These routes handle incoming requests from clients and define how your server should respond to those requests.
// note that we import test from our user.controllers, these controllers are like the functions used when we call on a route

import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/test', test);

export default router;