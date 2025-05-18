// "use client";

// import AuthForm from "@/components/Auth/Login/SignIn";
import LoginForm from "@/components/Auth/LoginForm";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (user) {
    redirect("/");
  }

  return (
    <div className="">
      <LoginForm />
    </div>
  );
}
