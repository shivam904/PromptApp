import NextAuth from "next-auth";
import UserModel from "@models/user.js";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
const handler= NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session,token}){
            const sessionUser= await UserModel.findOne({email:session.user.email});
            session.user.id=sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                await connectDB();
    
                // if already exist
                const userExist= await UserModel.findOne({email:profile.email});
    
    
                // if not, create account
                if(!userExist){
                await UserModel.create({
                    username:profile.name.replace(" "," ").toLowerCase(),
                    email:profile.email,
                    image:profile.picture
                })
            }
            return true;
                
            } catch (error) {
                console.log(error);
                return false;
            }
    
        }
    }
    
});
export {handler as GET, handler as POST};