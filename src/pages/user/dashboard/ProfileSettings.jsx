import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import DashboardSectionCard from "./DashboardSectionCard";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "../../../utils/apiErrorToast";

const defaultAvatar =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=85";

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "Dhaka",
    postal_code: user?.postal_code || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "Dhaka",
        postal_code: user.postal_code || "",
      });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setLoading(true);
      const res = await api.put("/user/profile", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postal_code: formData.postal_code.trim(),
      });

      if (res.data?.data) {
        updateUser(res.data.data);
      }
      toast.success(res.data?.message || "Profile updated successfully!");
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardSectionCard
      title="Profile settings"
      description="Keep your personal and delivery details up to date."
      className="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6 flex items-center gap-4">
          <img
            src={user?.avatar || defaultAvatar}
            alt={formData.name || "Customer"}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-neutral-200"
          />
          <div>
            <p className="text-[13px] font-semibold text-neutral-900">
              {formData.name || "Customer"}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              {formData.email}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Enter your full name"
            className="rounded-lg bg-white"
          />
          <Input
            label="Email address"
            type="email"
            value={formData.email}
            disabled
            className="rounded-lg bg-neutral-100 text-neutral-500 cursor-not-allowed"
          />
          <Input
            label="Phone number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1700-000000"
            className="rounded-lg bg-white"
          />
          <Input
            label="City / District"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Dhaka"
            className="rounded-lg bg-white"
          />
          <div className="sm:col-span-2">
            <Input
              label="Shipping Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="House, street, area details"
              className="rounded-lg bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            loading={loading}
            className="rounded-lg bg-black text-white hover:bg-neutral-800"
          >
            Save changes
          </Button>
        </div>
      </form>
    </DashboardSectionCard>
  );
}
