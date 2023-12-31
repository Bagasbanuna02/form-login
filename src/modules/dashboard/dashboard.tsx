"use client";
import {
  AppShell,
  Aside,
  Box,
  Burger,
  Button,
  Footer,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  Space,
  Table,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
// import { hookstate, useHookstate } from "@hookstate/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-simple-toasts";
import { TableSatu } from "./table_satu/table_satu";
import { TableDua } from "./table_dua/table_dua";
import exp from "constants";
import { useHookstate } from "@hookstate/core";
import { sSelectPage } from "./state";
import { useShallowEffect } from "@mantine/hooks";
import HeaderDashboard from "./header_dashboard";
import { cookies } from "next/dist/client/components/headers";
import { loadDataDashboard } from "./fun_load_dashboard";

export const Dashboard = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [user, setUser] = useState<any[]>([]);

  useShallowEffect(() => {
    loadDataUser();
  }, []);

  async function loadDataUser() {
   const data = await loadDataDashboard()
   setUser(data)
  }
  return (
    <>
    {/* {JSON.stringify(user)} */}
      <HeaderDashboard />
      <Space h={20} />
      <Table withBorder>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
         {user.map((e, i) => (
           <tr key={e.id}>
           <td>{e.username}</td>
           <td>{e.email}</td>
         </tr>
         ))}
        </tbody>
      </Table>
    </>
  );
};
