import express from "express";
// import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import fileUpload from "express-fileupload";
// import { errorMiddleware } from "./middlewares/error.js";
// import messageRouter from "./router/messageRouter.js";
// import userRouter from "./router/userRouter.js";
// import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./config/config.env" });

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

app.post('/api/v1/user/student/register', async (req, res) => {
    console.log("Received user data: ", req.body);
    try {
    const { firstName, lastName, email, phone, course, dob, gender, password } = req.body;
    const user = await user.create({
    firstName,
    lastName,
    email,
    phone,
    course,
    dob,
    gender,
    password,
    role: "Student",
  });
    res.json({ message: "Registration successful", user });
} catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ error: "User creation failed" });
}
});

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
// app.use("/api/v1/message", messageRouter);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/appointment", appointmentRouter);

// dbConnection();

// app.use(errorMiddleware);
export default app;