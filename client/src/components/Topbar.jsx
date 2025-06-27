import React, { use, useState } from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { PiSignIn } from "react-icons/pi";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { clearUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const {toggleSidebar} = useSidebar()
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSearchBox, setShowSearchBox] = useState(false);
  
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/Logout`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(clearUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  }

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex items-center justify-center gap-2">
        <button type="button" className="md:hidden" onClick={toggleSidebar} >
          <IoMenu size={22}/>
        </button>
        <Link to={RouteIndex}>
          <img src={logo} alt="Logo" className="md:w-auto w-96"/>
        </Link>
      </div>
      <div className="w-[500px]">
        <div className={`md:relative md:block  absolute left-0 w-full bg-white md:top-0 top-16 md:p-0 p-5 ${showSearchBox ? "block" : "hidden"}`}>
          <SearchBox />
        </div>
      </div>
      <div className="flex items-center gap-5">

        <button type="button" className="md:hidden block" onClick = {toggleSearchBox}>
          <IoSearchSharp size={24}/>
        </button>

        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <PiSignIn />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.user?.avatar?.trim() ? user.user.avatar : undefined}
                  alt={user.user?.name}
                  className="w-full h-full object-cover rounded-full"
                />
                <AvatarFallback>
                  <img
                    src={userIcon}
                    alt="User Fallback"
                    className="w-full h-full object-cover rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className="text-sm">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaUserCircle color="black" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <FaPlus color="blue" />
                  create blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <MdLogout color="red" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
