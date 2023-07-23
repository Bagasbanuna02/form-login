"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import _, { isEmpty } from "lodash";
import toast from "react-simple-toasts";
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme: any) => ({
  myCustomStyles: {
    ...theme.fn.radialGradient("blue", "red", "orange", "cyan", "white"),
  },
}));

const SignIn = () => {
  const router = useRouter();
  const formLogin = useForm({
    initialValues: {
      data: {
        // username: "",
        email: "",
        password: "",
      },
    },
  });

  async function loginButton() {
    const body = formLogin.values.data;
    // console.log(formLogin.values.data);
    if (Object.values(formLogin.values.data).includes("")) {
      toast("Lengkapi Data");
    }

    await fetch(`/api/auth/signin/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(async (val) => {
        if (val.status == 200) {
          toast(val.message);
          router.push("/dashboard");
        } else {
          toast(val.message);
        }
      });
  }

  async function customLogin() {
    const body = formLogin.values.data;

    if (Object.values(formLogin.values.data).includes("")) {
      toast("Lengkapi Data");
    } else {
      await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(async (val) => {
          if (val.status === 200) {
            router.push("/dashboard");
            toast("Berhasil Login");
            localStorage.setItem("username",val.data.username);
          } else {
            toast(val.message);
          }
        });
    }
  }

  return (
    <>
      <Box>
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          h={100 + "vh"}
        >
          <Paper bg={"gray.3"} p={30} radius={30} w={300}>
            <Stack>
              <Center>
                <Title order={3}>Login</Title>
              </Center>
              <TextInput
                // label="Email atau"
                placeholder="Email / Username"
                onChange={(val) => {
                  formLogin.values.data.email = val.target.value;
                }}
              />
              <PasswordInput
                placeholder="Password"
                onChange={(val) => {
                  formLogin.values.data.password = val.target.value;
                }}
              />
              <Flex justify="center" direction={"column"} align={"center"}>
                <Button
                  color="blue.4"
                  onClick={() => {
                    // loginButton();
                    customLogin();
                  }}
                >
                  Login
                </Button>
                <Link
                  href={"/auth/signup"}
                  style={{
                    textDecorationLine: "none",
                    textDecorationColor: "GrayText",
                  }}
                >
                  <Text mt={20} fz={12}>
                    Registrasi ?
                  </Text>
                </Link>
              </Flex>
            </Stack>
          </Paper>
        </Flex>
      </Box>
    </>
  );
};

export default SignIn;
