"use client";
import { Button } from "@mantine/core";
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";

export default function Logout() {
  const router = useRouter();
  return (
    <>
      <Button
        compact
        radius={50}
        bg={"red"}
        color="red.4"
        onClick={() => {
          fetch("/api/auth/logout").then((res) => {
            if (res.status === 200) {
              toast("Logout");
              router.push("/");
            }
          });
        }}
      >
        Logout
      </Button>
    </>
  );
}
