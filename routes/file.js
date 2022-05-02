import { Router } from "express";
import upload from "../middlewares/upload.js";
import { uploadToDb } from "../controllers/file.js";

const fileRouter = new Router();

fileRouter.post("/upload", upload.single("file"), uploadToDb);

export default fileRouter;
