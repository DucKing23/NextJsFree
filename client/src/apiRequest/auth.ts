import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<LoginResType>("auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};

export default authApiRequest;
