import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { RouteAdduser, RouteEdituser } from "@/helpers/RouteName";
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
import userIcon from "@/assets/images/user.png"; // Assuming you have a default user icon

const Users = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: data,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/getAllUsers`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  // console.log(data);

  const handleDelete = async (userId) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/deleteUser/${userId}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "user deleted successfully");
    } else {
      showToast("error", "Failed to delete user");
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
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.users.length > 0 ? (
                data.users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <img src={user.avatar || userIcon} className="w-10 h-10 rounded-full"/>
                    </TableCell>
                    <TableCell>{moment(user?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex items-center gap-3">
                      
                      <Button
                        onClick={() => handleDelete(user._id)}
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

export default Users;
