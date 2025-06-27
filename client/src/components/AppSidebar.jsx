import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { PiDotOutlineLight } from "react-icons/pi";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategorDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/getAllCategory`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} alt="Logo" width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoHomeOutline />
                <Link to={RouteIndex}>Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GrBlog />
                    <Link to={RouteBlog}>Blogs</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaRegCommentDots />
                    <Link to={RouteCommentDetails}>Comments</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
            {user && user.isLoggedIn && user.user.role === "admin" ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BiCategoryAlt />
                    <Link to={RouteCategorDetails}>Categories</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuUsers />
                    <Link to={RouteUser}>Users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.categories.length > 0 &&
              categoryData.categories.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton>
                    <PiDotOutlineLight />
                    <Link to={RouteBlogByCategory(category.slug)}>
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
