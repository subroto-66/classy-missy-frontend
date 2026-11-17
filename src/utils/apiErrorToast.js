import axios from "axios";
import toast from "react-hot-toast";



export const showApiErrorToast = (error) => {
  if (!axios.isAxiosError(error)) {
    toast.error("Something went wrong");
    return;
  }

  const data = error.response?.data;

  if (!data) {
    toast.error("Something went wrong");
    return;
  }

  if (data.errors && Object.keys(data.errors).length > 0) {
    const firstError = Object.values(data.errors)[0];

    toast.error(
      Array.isArray(firstError) ? firstError[0] : firstError
    );

    return;
  }

  toast.error(data.message || "Something went wrong");
};


