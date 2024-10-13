import { Schema, model, models } from "mongoose";
const User= new Schema({
    
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exist"],
    },
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username already exist"],
    },
    image:{
        type:String,
    }
});

const UserModel= models.User || model("User",User);
export default UserModel;