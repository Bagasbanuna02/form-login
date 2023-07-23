"use client";
import { ModelBarang } from "@/model/model_barang";
import { Box, Button, TextInput, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function EditBarang() {
  const [barang, setBarang] = useState<ModelBarang>();
  const router = useRouter()

  useShallowEffect(() => {
    loadBarangGetOne(localStorage.getItem("id_barang") as any);
  }, []);
  const loadBarangGetOne = async (idBarang: string) => {
    await fetch(`/api/barang/get-one?id=${idBarang}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setBarang);
  };


  const onUpdate = async (id: any) => {
    // console.log(id.id)
    const body = barang
    await fetch(`/api/barang/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then(async (val) => {
       if(val.status == 201){
        toast("Update Berhasil")
        router.push("/dashboard/table-satu")
       } else {
        toast('Gagal Update')
       }
      });
  };

  if (!barang) return <></>;

  return (
    <>
      {/* {JSON.stringify(barang.id)} */}
      <Box>
        <Title order={3}>Edit Data Barang</Title>
        <Box my={20} w={300}>
          <TextInput
            label="Nama barang"
            value={barang?.namaBarang as any}
            onChange={(val) => {
              //   console.log(val.target.value);
              setBarang({
                ...barang,
                namaBarang: val.target.value,
              });
            }}
          />

          <TextInput
          type="number"
            label="Harga Barang"
            value={barang?.harga as number}
            onChange={(val) => {
              //   console.log(val.target.value);
              setBarang({
                ...barang,
                harga: val.target.value as any,
              });
            }}
          />

          <Button
          my={20}
          onClick={() => {
            onUpdate(barang.id)
          }}
          >Simpan</Button>
        </Box>
      </Box>
    </>
  );
}
