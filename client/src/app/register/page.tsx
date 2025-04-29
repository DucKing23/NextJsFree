import RegisterForm from "@/app/register/register-form";
import React from "react";

function RegisterPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-center mt-12">Đăng ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
