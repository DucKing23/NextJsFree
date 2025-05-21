/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import accountApiRequest from "@/apiRequest/account";
import { clientsessionToken } from "@/lib/http";
import React, { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient();
    };
    fetchRequest();
  }, []);
  return <div>profile</div>;
}
