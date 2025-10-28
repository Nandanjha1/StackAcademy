import express from "express";
import { config } from "dotenv";
config({ path: "./config/config.env" });
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import codeEditorApi from "./models/codeEditorApi.js";
// import "./config/passport.js";
// import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", codeEditorApi);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);


app.post('/test', (req, res) => {
  console.log("Test route body:", req.body);
  res.send("Logged");
});

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
//  );

dbConnection();

app.use(errorMiddleware);
export default app;