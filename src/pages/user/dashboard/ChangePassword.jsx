import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import DashboardSectionCard from "./DashboardSectionCard";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "../../../utils/apiErrorToast";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/user/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });

      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardSectionCard
      title="Change password"
      description="Choose a strong password to keep your account safe."
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input
          label="Current password"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="rounded-lg bg-white"
        />
        <Input
          label="New password"
          type="password"
          placeholder="At least 6 characters"
          minLength={6}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="rounded-lg bg-white"
        />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="Re-enter new password"
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="rounded-lg bg-white"
        />
        <Button
          type="submit"
          loading={loading}
          className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
        >
          Update password
        </Button>
      </form>
    </DashboardSectionCard>
  );
}
