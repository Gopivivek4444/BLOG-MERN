import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
const LikeCount = ({props}) => {
    const [LikeCount, setLikeCount] = useState()
    const [hasLiked, setHasLiked] = useState(false)


    const user = useSelector((state) => state.user)
    const { data: blogLikeCount, loading, error } = useFetch(
              `${getEnv("VITE_API_BASE_URL")}/blogLike/getLike/${props.blogId}/${user && user.isLoggedIn ? user.user._id : ''}`,
              {
                method: "get",
                credentials: "include",
              }
            );

    useEffect(
      () =>{
        if(blogLikeCount){
          setLikeCount(blogLikeCount.likeCount)
          setHasLiked(blogLikeCount.isUserLiked)
        }
      },[blogLikeCount]
    )
    const handleLike = async() =>{
      try {
        if(!user.isLoggedIn){
          return showToast('error','please login into your account')
        }

        const response = await fetch(
              `${getEnv("VITE_API_BASE_URL")}/blogLike/doLike`,
              {
                method: "post",
                credentials: "include",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({userId: user.user._id, blogId: props.blogId})
              }
            );

            if(!response.ok){
              showToast('error',response.statusText)
            }

            const responseData = await response.json()
            setLikeCount(responseData.likeCount)
            setHasLiked(!hasLiked)

      } catch (error) {
        showToast('error', error.message)
      }
    }
  return (
    <button onClick={handleLike} type="button" className="flex justify-between items-center gap-1">
      {!hasLiked?
      <FaHeart />
      :
      <FaHeart color="red"/>  
    }
      {LikeCount}
    </button>
  );
};

export default LikeCount;
