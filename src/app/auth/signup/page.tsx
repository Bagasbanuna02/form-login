"use client";
import { SignUp } from "@/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <SignUp />
    </>
  );
}
