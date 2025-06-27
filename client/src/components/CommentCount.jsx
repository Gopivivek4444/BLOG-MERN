import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { FaComment } from "react-icons/fa";


const CommentCount = ({props}) => {
     const { data, loading, error } = useFetch(
          `${getEnv("VITE_API_BASE_URL")}/comment/getCount/${props.blogId}`,
          {
            method: "get",
            credentials: "include",
          }
        );
        
  return (
    <button type='button' className='flex justify-between items-center gap-1'>
      <FaComment/>
      {data && data.commentCount}
    </button>
  )
}

export default CommentCount