import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategorDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser } from './helpers/RouteName'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/category/AddCategory'
import CategoryDetails from './pages/category/CategoryDetails'
import EditCategory from './pages/category/EditCategory'
import BlogDetails from './pages/Blog/BlogDetails'
import AddBlog from './pages/Blog/AddBlog'
import EditBlog from './pages/Blog/EditBlog'
import SingleBlogDetails from './pages/SingleBlogDetails'
import BlogByCategory from './pages/Blog/BlogByCategory'
import SearchResult from './pages/SearchResult'
import AllComments from './pages/AllComments'
import Users from './pages/Users'
import AuthRouteProtection from './components/AuthRouteProtection'
import OnlyAdminAllowed from './components/OnlyAdminAllowed'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout/>}>
          <Route index element={<Index/>}/>

          // blog
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails/>}/>
          <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}/>
          <Route path={RouteSearch()} element={<SearchResult/>}/>
          
          <Route element={<AuthRouteProtection/>}>
              <Route path={RouteProfile} element={<Profile/>}/>
              <Route path={RouteBlog} element = {<BlogDetails/>}/>
              <Route path={RouteBlogAdd} element={<AddBlog/>}/>
              <Route path={RouteBlogEdit()} element={<EditBlog/>}/>
              <Route path={RouteCommentDetails} element={<AllComments/>}/>
          </Route>

          <Route element={<OnlyAdminAllowed/>}>
              //blog category
              <Route path={RouteAddCategory} element={<AddCategory/>}/>
              <Route path={RouteCategorDetails} element={<CategoryDetails/>}/>
              <Route path={RouteEditCategory()} element={<EditCategory/>}/>
              <Route path={RouteUser} element={<Users/>}/>
          </Route>

        </Route>
        <Route path={RouteSignIn} element={<SignIn/>}/>
        <Route path={RouteSignUp} element={<SignUp/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App