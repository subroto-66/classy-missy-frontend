import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "../../utils/apiErrorToast";
import Button from "../ui/Button";
import OTPInput from "../ui/OtpInput";



export default function VerifyCodeForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

    //   const res = await api.post("/verify-code", {
    //     email,
    //     code: data.otp,
    //   });

    //   const resetToken = res.data?.data?.resetToken;

    //   sessionStorage.setItem("resetToken", resetToken);

      navigate(
        `/reset-password?email=${encodeURIComponent(email)}`
      );

      toast.success("OTP verified successfully");
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 lg:w-[350px]"
    >
      <div>
        <Controller
          name="otp"
          control={control}
          rules={{
            required: "OTP is required",
            minLength: {
              value: 6,
              message: "Please enter the complete 6-digit OTP",
            },
          }}
          render={({ field }) => (
            <OTPInput
              length={6}
              value={field.value}
              onChange={field.onChange}
              error={errors.otp?.message}
              label="OTP"
              required
            />
          )}
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="my-4 w-full"
      >
        Verify Code
      </Button>
    </form>
  );
}
