"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Loader,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";

const SignUp = () => {
  const router = useRouter();

  const formRegister = useForm({
    initialValues: {
      data: {
        username: "",
        email: "",
        password: "",
      },
      validate: {
        email: (value: string) =>
          /^\S+@\S+$/.test(value) ? null : "Invalid email",
      },
    },
  });

  const signUpButton = () => {
    // console.log(formRegister.values.data);
    if (Object.values(formRegister.values.data).includes("")) {
      toast("Lengkapi Data");
    } else {
      if (
        formRegister.values.validate.email(formRegister.values.data.email) !=
        null
      ) {
        toast("Invalid Email");
      } else {
        localStorage.setItem("username", formRegister.values.data.username);
        localStorage.setItem("password", formRegister.values.data.password);
        localStorage.setItem("email", formRegister.values.data.email);
        localStorage.setItem("token", "1");
        toast("Registrasi Berhasil");
        router.push("./signin");
      }
    }
  };

  if (!formRegister.values) {
    return (
      <>
        <Loader />
      </>
    );
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
          <Paper bg={"blue.1"} p={30} radius={30}>
            <Center>
              <Title order={3}>Registrasi</Title>
            </Center>
            <TextInput
              label="username"
              type="text"
              onChange={(val) => {
                formRegister.values.data.username = val.target.value;
              }}
            />
            <TextInput
              label="email"
              type="email"
              onChange={(val) => {
                formRegister.values.data.email = val.target.value;
              }}
            />
            <PasswordInput
              label="password"
              onChange={(val) => {
                formRegister.values.data.password = val.target.value;
              }}
            />

            <Button
              type="submit"
              my={10}
              onClick={() => {
                // localStorage.setItem("username", form.values.username);
                // localStorage.setItem("email", form.values.email);
                // localStorage.setItem("password", form.values.password);
                signUpButton();
              }}
            >
              Sign Up
            </Button>
          </Paper>
        </Flex>
      </Box>
    </>
  );
};

export default SignUp;
