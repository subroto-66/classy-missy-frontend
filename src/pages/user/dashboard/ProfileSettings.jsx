import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import DashboardSectionCard from "./DashboardSectionCard";
import { profileImage } from "./dashboardData";

export default function ProfileSettings() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <DashboardSectionCard
      title="Profile settings"
      description="Keep your personal details up to date."
      className="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6 flex items-center gap-4">
          <img
            src={profileImage}
            alt="Sarah Johnson"
            className="h-14 w-14 rounded-full object-cover grayscale"
          />
          <div>
            <p className="text-[12px] font-semibold text-neutral-900">
              Profile photo
            </p>
            <p className="mt-1 text-[10px] text-neutral-500">
              JPG or PNG, up to 5 MB
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="ml-auto rounded-lg border-neutral-300 text-xs"
          >
            Change photo
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            defaultValue="Sarah Johnson"
            className="rounded-lg bg-white"
          />
          <Input
            label="Email address"
            type="email"
            defaultValue="sarah.johnson@email.com"
            className="rounded-lg bg-white"
          />
          <Input
            label="Phone number"
            type="tel"
            defaultValue="+880 1712-345678"
            className="rounded-lg bg-white"
          />
          <Input
            label="Date of birth"
            type="date"
            defaultValue="1996-04-18"
            className="rounded-lg bg-white"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            className="rounded-lg bg-black text-white hover:bg-neutral-800"
          >
            Save changes
          </Button>
          {saved && (
            <span className="text-[11px] text-neutral-600">
              Your details have been saved on this page.
            </span>
          )}
        </div>
      </form>
    </DashboardSectionCard>
  );
}
