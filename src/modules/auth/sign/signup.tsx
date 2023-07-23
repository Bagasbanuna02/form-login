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
    const body = formRegister.values.data;
    // console.log(body);

    if (Object.values(formRegister.values.data).includes("")) {
      toast("Lengkapi Data");
    } else {
      if (
        formRegister.values.validate.email(formRegister.values.data.email) !=
        null
      ) {
        toast("Invalid Email");
      } else {
        fetch("/api/auth/signup/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((val) => {
            if (val.status == 209) {
              toast(val.message);
            } else {
              toast("Registrasi Berhasil");
              router.push("./signin");
            }
          });
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
          <Paper bg={"blue.1"} p={30} radius={30} w={300}>
            <Center>
              <Title order={3}>Registrasi</Title>
            </Center>
            <TextInput
              label="Username"
              type="text"
              onChange={(val) => {
                formRegister.values.data.username = val.target.value;
              }}
            />
            <TextInput
              label="Email"
              type="email"
              onChange={(val) => {
                formRegister.values.data.email = val.target.value;
              }}
            />
            <PasswordInput
              label="Password"
              onChange={(val) => {
                formRegister.values.data.password = val.target.value;
              }}
            />

           <Flex direction={"column"}>
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
            <Link href={"./signin"} style={{textDecorationLine: "none"}}>Saya sudah ada akun!</Link>
           </Flex>
          </Paper>
        </Flex>
      </Box>
    </>
  );
};

export default SignUp;
