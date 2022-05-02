import Express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import fileRouter from "./routes/file.js";
import connectDB from "./database/config.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = Express();

app.use(cors());
app.use(Express.json());

connectDB();

app.use("/user", userRouter);
app.use("/file", fileRouter);

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
