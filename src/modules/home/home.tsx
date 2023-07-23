"use client";
import { Button, Flex, Group, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import toast from "react-simple-toasts";

export const App = () => {
  const [refresh, setRefresh] = useState("1");

  // useShallowEffect(() => {
  //   localStorage.getItem("token");
  // }, []);

  return (
    <>
    {/* {JSON.stringify(localStorage.getItem("token"))} */}
    {/* {JSON.stringify(refresh)} */}

      <Flex
        direction="column"
        justify="center"
        align={"center"}
        h={"100vh"}
        key={refresh}
      >
        <Title>HOME</Title>
        <Link href={"/auth/signin"}>Login</Link>
        <Link href={"/dashboard"}>Males Login</Link>

        


        {/* {(() => {
          if (typeof window !== undefined ? localStorage.getItem("token") != "1" : null)  {
            return (
              <>
                <Link href={"/auth/signin"}>Login</Link>
              </>
            );
          }
          else {
          return (
            <>
              <Button
                onClick={() => {
                  setInterval
                  // localStorage.removeItem("token");
                  setRefresh(Math.random().toString())
                  toast("Anda Berhasil Logout")

                }}
              >
                Logout
              </Button>
            </>
          );
          }
        })()} */}
      </Flex>
    </>
  );
};
