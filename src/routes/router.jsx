import { createBrowserRouter } from "react-router";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import ProductDetails from "../pages/public/ProductDetails";
import Products from "../pages/public/Products";
import Brands from "../pages/public/Brands";
import Wishlist from "../pages/public/Wishlist";
import Cart from "../pages/public/Cart";
import About from "../pages/public/About";
import FAQ from "../pages/public/FAQ";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import Blogs from "../pages/public/Blogs";
import BlogDetails from "../pages/public/BlogDetails";
import Categories from "../pages/public/Categories";
import Campaigns from "../pages/public/Campaigns";
// import Coupons from "../pages/public/Coupons";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyCode from "../pages/auth/VerifyCode";
import ResetPassword from "../pages/auth/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardOverview from "../pages/user/dashboard/DashboardOverview";
import MyOrders from "../pages/user/dashboard/MyOrders";
import ShoppingCart from "../pages/user/dashboard/ShoppingCart";
import TransactionHistory from "../pages/user/dashboard/TransactionHistory";
import ProfileSettings from "../pages/user/dashboard/ProfileSettings";
import ChangePassword from "../pages/user/dashboard/ChangePassword";
import MyReviews from "../pages/user/dashboard/MyReviews";
import NotFound from "../pages/public/NotFound";



export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "orders", element: <MyOrders /> },
      { path: "cart", element: <ShoppingCart /> },
      { path: "transactions", element: <TransactionHistory /> },
      { path: "profile", element: <ProfileSettings /> },
      { path: "password", element: <ChangePassword /> },
      { path: "reviews", element: <MyReviews /> },
    ],
  },
  {
    element: <PublicLayout/>,
    children: [
      { path: "/", element: <Home/> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      { path: "/campaigns", element: <Campaigns /> },
      // { path: "/coupons", element: <Coupons /> },
      { path: "/brands", element: <Brands /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/cart", element: <Cart /> },
      { path: "/my-cart", element: <Cart /> },
      { path: "/about-us", element: <About /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-and-conditions", element: <TermsAndConditions /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blog/:blogSlug", element: <BlogDetails /> },
      { path: "/product/:productSlug", element: <ProductDetails /> },
    ],
  },
  {
    element: <AuthLayout/>,
    children:[
        {path:"/login", element: <Login/>} ,
        {path:"/register", element: <Register/>} ,
        {path:"/forgot-password", element: <ForgotPassword/>} ,
         { path: "/verify-code", element: <VerifyCode /> },
         { path: "/reset-password", element: <ResetPassword /> },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);
