"use client"
import { useState, useEffect } from 'react'
import PromtCard from './PromtCard'

const PromptCardList=({data,handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {
        data?.map((post)=>(
          <PromtCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))
      }
    </div>

  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState(' ');
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts=async()=>{
      const res=await fetch('/api/prompt',{
        method:"GET",
      });
      const data=await res.json();
      setPosts(data); 

    }
    fetchPosts();

  },[])
  return (
   <section className='feed'>
    <form className='relative w-full flex-center'>
      <input placeholder='Search for a tag or a username' type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} className='search_input peer'  required/>

    </form>
    <PromptCardList data={posts} handleTagClick={()=>{}}/>
   </section>
  )
}

export default Feed
