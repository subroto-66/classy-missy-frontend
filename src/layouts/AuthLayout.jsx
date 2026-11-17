import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main  className="min-h-screen h-full flex-col flex justify-center">
        <Outlet />
      </main>
  );
}