import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

let isConnected=false;
export const connectDB= async()=>{
    mongoose.set('strictQuery',false);
    if(!isConnected){
        try{
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:"NextTutorial",
                useNewUrlParser:true,
                useUnifiedTopology:true,
            });
            isConnected=true;
            console.log("Connected to database");
        }catch(error){
            console.log(error);
        }
        
    }
    else{
        console.log("Already connected to database");
    }
}