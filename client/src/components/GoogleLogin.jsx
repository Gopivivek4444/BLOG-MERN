import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { RouteIndex } from "@/helpers/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice.js";

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLoginWithGoogle = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/googleLogin`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
         return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <Button
      variant="outline"
      className="w-full "
      onClick={handleLoginWithGoogle}
    >
      <FcGoogle />
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
