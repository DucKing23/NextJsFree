import LoginForm from "@/app/login/login-form";
import React from "react";

function LoginPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-center mt-12">Đăng Nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
