import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "../../utils/apiErrorToast";
import Input from "../ui/Input";
import Button from "../ui/Button";


export default function UserForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

    //   await api.post("/forgot-password", {
    //     email: data.email,
    //   });

      toast.success("Code sent to your email");

      navigate(
        `/verify-code?email=${encodeURIComponent(data.email)}`
      );
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 lg:w-[380px]"
    >
      <div>
        <Input
          type="email"
          label="Email"
          disabled={loading}
          required
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

      <Button
        type="submit"
        loading={loading}
        className="my-4 w-full"
      >
        Send Code
      </Button>
    </form>
  );
}
