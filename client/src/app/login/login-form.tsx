/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LoginBody,
  LoginBodyType,
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { title } from "process";
import { toast } from "sonner";
const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const LoginForm = () => {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then(async (res) => {
        const payload = await res.json();
        console.log(res);
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });

      toast("Đã đăng nhập thành công", {
        description: result.payload.message,
      });

      // neu dang nhap thanh cong thi goi toi server
      const resultFormNextServer = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }).then(async (res) => {
        const payload = await res.json();
        console.log(res);
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast("Lỗi", {
          description: error.payload.message,
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-[400px] flex-shrink-0 w-full"
        noValidate
      >
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
