"use client"
import {useState,useEffect} from 'react'
import {useRouter,useSearchParams} from 'next/navigation';
import {useSession} from 'next-auth/react';
import Form from '@components/Form';
const EditPrompt = () => {
    const router=useRouter();
    const {data:session}=useSession();
    const searchParams=useSearchParams();
    const promptId=searchParams.get('id');

    const [post, setPost] = useState({
        prompt:" ",
        tag:" "
    });

    const [submitting,setSubmitting]=useState(false);

    useEffect(()=>{
        const getPrompt=async ()=>{
            const res=await fetch(`/api/prompt/${promptId}`)
            const data=await res.json();
            setPost({prompt:data.prompt,tag:data.tag});
        }
        if(promptId) getPrompt();
    },[promptId])

    const updatePrompt=async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert("Prompt ID is required")
        try {
            const res= await fetch(`/api/prompt/${promptId}`,{
                method:"PATCH",
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            
            if(res.ok){
                router.push('/');
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
        }

    
  return (
    <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt}/>
  )
}

export default EditPrompt
