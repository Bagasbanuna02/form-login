"use client";

import { Box, Button, NumberInput, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function TambahBarang() {
  const router = useRouter();
  const [barang, setBarang] = useState({
    namaBarang: "",
    harga: "",
  });

  const tambah = async () => {
    const body = barang;

    if (Object.values(barang).includes("")) {
      toast("Isi Data ");
    } else {
      await fetch("/api/barang/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(() => {
            toast("Data Tersimpan")
          router.push("/dashboard/table-satu");
        });
    }
    // console.log(body)
  };
  return (
    <>
    <Box>
    <Title order={3}>Tambah Barang</Title>
      <Box w={300} my={20}>
        <TextInput
          label="Nama Barang"
          onChange={(val) => {
            setBarang({
              ...barang,
              namaBarang: val.currentTarget.value,
            });
          }}
        />
        <TextInput
          label="Harga Barang"
          type="number"
          onChange={(val) => {
            setBarang({
              ...barang,
              harga: val.currentTarget.value as any,
            });
          }}
        />
        <Button
          my={20}
          onClick={() => {
            tambah();
          }}
        >
          Simpan
        </Button>
      </Box>
    </Box>
    </>
  );
}
