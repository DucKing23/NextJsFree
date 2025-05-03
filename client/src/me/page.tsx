import envConfig from "@/config";
import React from "react";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("theme");
  console.log(sessionToken);
  //   const result = await fetch(
  //     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${sessionToken}`,
  //       },
  //     }
  //   ).then(async (res) => {
  //     const payload = await res.json();
  //     const data = {
  //       status: res.status,
  //       payload,
  //     };
  //     if (!res.ok) {
  //       throw data;
  //     }
  //     return data;
  //   });

  return <div>me do</div>;
}
