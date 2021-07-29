//Importing ENV variable
require("dotenv").config();

//Library
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//configs
import googleAuthConfig from "./config/google.config";

//microservice connection
import Auth from "./API/Auth";

//Database connection
import connectDB from "./database/connection";

const zomato = express();

//application middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended : false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
 googleAuthConfig (passport);

//Application Routes
zomato.use("/auth", Auth);

zomato.get("/", (req, res)=> res.json({message:"setup sucess"}));

zomato.listen(4000,() => 
connectDB().then(() => console.log("server is running"))
.catch(()=> console.log("server is running, but database connection failed..."))
);