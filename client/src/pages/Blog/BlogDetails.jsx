import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { deleteData } from '@/helpers/handleDelete';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import moment from 'moment';

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
    const {
      data: blogData,
      loading,
      error,
    } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/Blog/showAllBlog`,
      {
        method: "get",
        credentials: "include",
      },
      [refreshData]
    );

  
    const handleDelete = async (blogId) => {
      const response = deleteData(
        `${getEnv("VITE_API_BASE_URL")}/blog/deleteBlog/${blogId}`
      );
      if (response) {
        setRefreshData(!refreshData);
        showToast("success", "blog deleted successfully");
      } else {
        showToast("error", "Failed to delete blog");
      }
    };
  
    if (loading) return <Loading />;
  return (
     <div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Author </TableHead>
                <TableHead>blog</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blogs.length >0 ? 
                blogData.blogs.map(blog => 
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex items-center gap-3">
                        <Button asChild variant='outline' className='hover:bg-violet-500 hover:text-white'>
                          <Link to={RouteBlogEdit(blog._id)}>
                            <FaRegEdit/>
                          </Link>
                        </Button>
                        <Button onClick = {() => handleDelete(blog._id)} variant='outline' className='hover:bg-violet-500 hover:text-white'>
                          
                            <FaRegTrashCan/>
                          
                        </Button>
                    </TableCell>
                  </TableRow>
                )
              :
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No blogs found
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails