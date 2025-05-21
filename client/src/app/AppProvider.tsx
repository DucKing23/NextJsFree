"use client";
import { clientsessionToken } from "@/lib/http";
import { useState } from "react";

export default function AppProvider({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  useState(() => {
    if (typeof window !== "undefined")
      clientsessionToken.value = initialSessionToken;
  });

  return <>{children}</>;
}
