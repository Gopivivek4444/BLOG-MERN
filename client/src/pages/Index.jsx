import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'

const index = () => {

   const {
        data: blogData,
        loading,
        error,
      } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/Blog/getAllBlogs`,
        {
          method: "get",
          credentials: "include",
        }
      );
  


      if(loading) return <Loading/>

  return (
    <div className='grid md:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-10'>
      {blogData && blogData.blogs.length > 0 ? 
        blogData.blogs.map(blog => <BlogCard key={blog._id} props = {blog}/>)  
        :
        <div> No Blogs Found </div>
    }
    </div>
  )
}

export default index