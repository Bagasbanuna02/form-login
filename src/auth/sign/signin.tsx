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
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import _, { isEmpty } from "lodash";
import toast from "react-simple-toasts";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const formLogin = useForm({
    initialValues: {
      data: {
        username: "",
        email: "",
        password: "",
      },
    },
  });

  function loginButton() {
    //  console.log(formLogin.values.data)
    // if (localStorage.getItem("token") == null) {
    //   toast("Registrasi Dulu");
    // } else 
    if (
      formLogin.values.data.username != localStorage.getItem("username")
    ) {
      toast("Username Salah");
    } else if (formLogin.values.data.email != localStorage.getItem("email")) {
      toast("Email Salah");
    } else if (
      formLogin.values.data.password != localStorage.getItem("password")
    ) {
      toast("Password Salah");
    } else {
      toast("SELAMAT LOGIN");
      router.push("/dashboard");
    }
  }

  return (
    <>
      {/* {JSON.stringify(localStorage.getItem("username"))}
      {JSON.stringify(localStorage.getItem("email"))}
      {JSON.stringify(localStorage.getItem("password"))}
      {JSON.stringify(localStorage.getItem("token"))} */}

      <Box>
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          h={100 + "vh"}
        >
          <Paper bg={"gray"} p={30} radius={30}>
            <Center>
              <Title order={3}>Login</Title>
            </Center>
            <TextInput
              label="username"
              onChange={(val) => {
                formLogin.values.data.username = val.target.value;
              }}
            />
            <TextInput
              label="email"
              onChange={(val) => {
                formLogin.values.data.email = val.target.value;
              }}
            />
            <PasswordInput
              label="password"
              onChange={(val) => {
                formLogin.values.data.password = val.target.value;
              }}
            />
            <Group position="center">
              <Button
                my={10}
                onClick={() => {
                  loginButton();
                }}
              >
                Login
              </Button>
            </Group>
            <Link href={"/auth/signup"}>register</Link>
          </Paper>
        </Flex>
      </Box>
    </>
  );
};

export default SignIn;
