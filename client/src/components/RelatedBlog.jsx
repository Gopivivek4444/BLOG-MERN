import { getEnv } from "@/helpers/getEnv";
import { RouteBlogDetails } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link } from "react-router-dom";

const RelatedBlog = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/getRelatedBlog/${props.category}/${
      props.currentBlog
    }`,
    {
      method: "get",
      credentials: "include",
    }
  );
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Related Blogs</h2>
      <div>
        {data && data.relatedBlog.length > 0 ? (
          data.relatedBlog.map((blog) => (
            <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
              <div className="flex items-center gap-2 mb-3">
              <img className = "w-[100px] h-[80px] object-cover rounded-md"src={blog.featuredImage}/>
              <h4 className="line-clamp-2 text-lg font-light">{blog.title}</h4>
            </div>
            </Link>
          ))
        ) : (
          <div>No Related Blogs</div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlog;
