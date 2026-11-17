import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../ui/Input";
import Checkbox from "../ui/CheckBox";
import CustomLink from "../ui/CustomLink";
import Button from "../ui/Button";
import SectionSubTitle from "../typo/SectionSubTitle";
import { useForm } from "react-hook-form";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "../../utils/apiErrorToast";

export default function UserLoginForm() {

 const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/login", data);
      const user = response.data.data;
      toast.success("Login Success");
    //   if (user.role === "admin") {
    //     router.push("/admin-dashboard");
    //   } else {
    //     router.push("/user-dashboard");
    //   }
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:w-[380px]">
      <div>
        <Input
          type="email"
          label="Email"
          required
          disabled={loading}
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email?.message}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          required
          disabled={loading}
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password?.message}
        />
      </div>
      <div className="flex justify-between">
        <Checkbox {...register("rememberMe")} label="Remember Me" />
        <CustomLink text="Forgot Passowrd" href="/forgot-password" />
      </div>
      <Button loading={loading} type="submit" className="my-4 w-full">
        Login
      </Button>

      <SectionSubTitle>
        Don't have an account?{" "}
        <CustomLink className="ml-2" href="/register" text="Register" />
      </SectionSubTitle>

      {/* <Divider className="mt-6" text="Or continue with" /> */}
      {/* <SocialLogins /> */}
    </form>
  );
}
