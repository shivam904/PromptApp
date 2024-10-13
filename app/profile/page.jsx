"use client"
import ProfileComponent from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
const Profile = () => {
    const [] = useState();
    const [posts, setPosts] = useState([]);
    const router=useRouter();
    const {data:session}=useSession();
    const handleDelete=async(post)=>{
      const hasConfirmed=confirm("Are you sure you want to delete this post?");
      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:"DELETE"
          })
          const newPosts=posts.filter((p)=>p._id!==post._id);
          setPosts(newPosts);

        } catch (error) {
          console.log(error);
          
        }
      }

    }
    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
   
  useEffect(()=>{
    const fetchPosts=async()=>{
      const res=await fetch(`/api/users/${session?.user.id}/posts`,{
        method:"GET",
      });
      const data=await res.json();
      setPosts(data); 
      console.log(data);

    }
    if(session?.user.id) fetchPosts();

  },[])
  return (
   <ProfileComponent name="my" desc="Welcome to your personilzed profile page" handleEdit={handleEdit} data={posts} handleDelete={handleDelete}/>
  )
}

export default Profile
