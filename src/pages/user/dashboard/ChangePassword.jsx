import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import DashboardSectionCard from "./DashboardSectionCard";

export default function ChangePassword() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(
      "Password updates will be available when account services are connected.",
    );
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
          required
          className="rounded-lg bg-white"
        />
        <Input
          label="New password"
          type="password"
          placeholder="At least 8 characters"
          minLength={8}
          required
          className="rounded-lg bg-white"
        />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="Re-enter new password"
          minLength={8}
          required
          className="rounded-lg bg-white"
        />
        <Button
          type="submit"
          className="rounded-lg bg-black text-white hover:bg-neutral-800"
        >
          Update password
        </Button>
        {message && (
          <p role="status" className="text-[11px] leading-5 text-neutral-600">
            {message}
          </p>
        )}
      </form>
    </DashboardSectionCard>
  );
}
