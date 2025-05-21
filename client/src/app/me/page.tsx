import React from "react";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequest/account";
import Profile from "@/app/me/profile";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "");
  return (
    <div>
      Name la: {result.payload.data.name}
      <Profile />
    </div>
  );
}
