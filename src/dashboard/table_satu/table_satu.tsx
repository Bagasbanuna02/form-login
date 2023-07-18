"use client";

import { Box, Button, Flex, Table, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { keys } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export const TableSatu = () => {
  const router = useRouter();
  const [barang, setBarang] = useState<any[]>([]);

  useShallowEffect(() => {
    loadBarang();
  }, []);

  const loadBarang = async () => {
    await fetch("/api/barang/get")
      .then((res) => res.json())
      .then(setBarang);
  };

  const onDelete = async (id: string) => {
    console.log(id);
    await fetch(`/api/barang/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((val) => {
        loadBarang();
        toast(val.message);
      });
  };

  return (
    <>
      {/* {JSON.stringify(barang)} */}
      <Box>
        <Title order={3}>Table Barang</Title>
        <Button
          onClick={() => {
            router.push("/dashboard/table-satu/tambah");
          }}
        >
          Tambah
        </Button>
        <Table>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {barang.map((e) => (
              <tr key={e.id}>
                <td>{e.namaBarang}</td>
                <td>{e.harga}</td>
                <td>
                  <Flex gap={"md"}>
                  <Button
                    color="green"
                    onClick={() => {
                      router.push("/dashboard/table-satu/edit");
                      localStorage.setItem("id_barang", e.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    onClick={() => {
                      onDelete(e.id);
                    }}
                  >
                    Hapus
                  </Button>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
};
