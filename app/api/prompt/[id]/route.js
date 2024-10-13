import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET= async (req,{params}) => {
    try {
        await connectDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const PATCH = async(req,{params})=>{
    const {prompt,tag}=await req.json();
    try {
        await connectDB();
        const existingPrompt= await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found", { status: 404 });
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });

    } catch (error) {
        return new Response("Something went wrong", { status: 500 });
        
    }
}

export const DELETE = async(req, {params})=>{
    try {
        await connectDB();
        const deletedPrompt= await Prompt.findByIdAndDelete(params.id);
        if(!deletedPrompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(deletedPrompt), { status: 200 });

    } catch (error) {
        return new Response("Something went wrong", { status: 500 });

    }
}