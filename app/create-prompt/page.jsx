"use client"
import {useState} from 'react'
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import Form from '@components/Form';
const CreatePrompt = () => {
    const router=useRouter();
    const {data:session}=useSession();

    const [post, setPost] = useState({
        prompt:" ",
        tag:" "
    });

    const [submitting,setSubmitting]=useState(false);
    const createPrompt=async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        try {
            const res= await fetch('/api/prompt/new',{
                method:"POST",
                body:JSON.stringify({
                    userId:session?.user.id,
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            if(res.ok){
                router.push('/')
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
        }

    
  return (
    <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}/>
  )
}

export default CreatePrompt
