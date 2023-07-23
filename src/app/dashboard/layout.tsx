"use client";
import { Logout, TableDua, TableSatu } from "@/modules/dashboard";
import {
  AppShell,
  Burger,
  Button,
  Flex,
  Grid,
  Group,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { upperCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const listNavbar = [
  {
    id: 1,
    name: "Table Barang",
    view: TableSatu,
    href: "/dashboard/table-satu",
  },
  {
    id: 2,
    name: "Table 2",
    view: TableDua,
    href: "/dashboard/table-dua",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState<any>("")

  useShallowEffect(() => {
  setUsername(localStorage.getItem("username"))

  },[])

  return (
    <>
      <section>
        {" "}
        <div>
          <AppShell
            styles={{
              main: {
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            // header={
            //   <Header height={{ base: 50, md: 70 }} p="md">
            //     <div
            //       style={{
            //         display: "flex",
            //         alignItems: "center",
            //         height: "100%",
            //       }}
            //     >
            //       <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            //         <Burger
            //           opened={opened}
            //           onClick={() => setOpened((o) => !o)}
            //           size="sm"
            //           color={theme.colors.gray[6]}
            //           mr="xl"
            //         />
            //       </MediaQuery>

            //       <Text
            //         fw={"bold"}
            //         fz={30}
            //         sx={{ cursor: "pointer" }}
            //         onClick={() => {
            //           router.push("/dashboard");
            //         }}
            //       >
            //         Bali Interaktif Perkasa
            //       </Text>

            //     </div>
            //   </Header>
            // }

            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 200, lg: 300 }}
              >
                <Navbar.Section>
                  <Text
                    fw={"bold"}
                    fz={30}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    BIP
                    <Text fz={10}>Bali Interaktif Perkasa, Welcome {`${upperCase(username)}`} </Text>
                  </Text>
                </Navbar.Section>
                <Navbar.Section grow mt={"md"}>
                  {listNavbar.map((e, i) => (
                    <NavLink
                      key={e.id}
                      label={e.name}
                      onClick={() => {
                        router.push(e.href);
                      }}
                    />
                  ))}
                </Navbar.Section>
                <Navbar.Section>
                  <Group position="center">
                    <Logout/>
                  </Group>
                </Navbar.Section>
              </Navbar>
            }
          >
            <pre></pre>
            {children}
          </AppShell>
        </div>
      </section>
    </>
  );
}
