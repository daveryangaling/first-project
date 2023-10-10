import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/user.js";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());
app.use(cors());

app.post('/SignUp',async(req,res)=>{
    const{username, email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user) return res.status(404).json({message:"User already existed"})
        const hashpassword = await bcrypt.hash(password,10)

        const newuser = new UserModel({username, email, password:hashpassword})
        await newuser.save();
        res.status(200).json(newuser,{message:"User successfull created"});
    } catch (error) {
        console.log(error);
    }
})
mongoose
  .connect(
    "mongodb+srv://test123:executive123@cluster0.bdrkkcr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to mongodb"));
app.listen(3000, () => console.log("server is running in port 3000"));
