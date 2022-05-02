import { Router } from "express";
import { deleteRecord, updateRecord } from "../controllers/record.js";
import { deleteUser, getUsers, getUserRecords } from "../controllers/user.js";

const userRouter = new Router();

userRouter.get("/", getUsers);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id/records", getUserRecords);
userRouter.delete("/:user_id/records/:record_id", deleteRecord);
userRouter.patch("/:user_id/records/:record_id", updateRecord);

export default userRouter;
