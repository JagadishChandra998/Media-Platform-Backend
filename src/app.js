import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({                       //use cors to allow cross-origin requests from the frontend
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// those are use for gaining data from the request body and cookies. 
app.use(express.json({ limit: "20kb" }))    // express.json() is used to parse JSON data from the request body
app.use(express.urlencoded({ extended: true, limit: "20kb" }))  // while express.urlencoded() is used to parse URL-encoded data.
app.use(express.static("public")) // This line serves static files from the "public" directory. It allows you to access files like images, CSS, and JavaScript directly from the "public" folder without needing to define specific routes for them.
app.use(cookieParser())   //cookieParser() is used to parse cookies from the incoming requests. By using these middlewares, we can easily access the data sent by the client in our route handlers.



// routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)

export default app;