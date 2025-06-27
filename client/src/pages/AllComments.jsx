import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { RouteAddcomment, RouteEditcomment } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import moment from "moment";

const AllComments = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: data,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/getAllComments`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  // console.log(data);

  const handleDelete = async (commentId) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/deleteComment/${commentId}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "comment deleted successfully");
    } else {
      showToast("error", "Failed to delete comment");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Blog </TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogId?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell>{moment(comment?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex items-center gap-3">
                      
                      <Button
                        onClick={() => handleDelete(comment._id)}
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                      >
                        <FaRegTrashCan />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllComments;
