"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainContainer from "@/components/MainContainer";
import Breadcrumb from "@/components/Breadcrumb";
import FormControl from "@/components/FormControl";
import LabelInput from "@/components/LabelInput";
import InputForm from "@/components/InputForm";
import ButtonSubmit from "@/components/ButtonSubmit";
import Swal from "sweetalert2";


export default function ProductEdit() {
//   const { id } = useParams() as { id: string };
  const [name, setName] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Barang berhasil diperbarui!",
        timer: 2000,
        showConfirmButton: true,
      });

      setTimeout(() => {
        router.push("/barang");
      }, 1500);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        const errorMessage = errors?.name?.[0] || message;

        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui barang.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Barang</h1>
      <MainContainer>
        <div className="flex justify-between mb-5">
          <Breadcrumb />
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormControl>
            <LabelInput htmlFor="name" label="Nama" />
            <InputForm
                name="name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </FormControl>
          <FormControl>
            <LabelInput htmlFor="stock" label="Stok" />
            <InputForm
                name="stock"
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
            />
          </FormControl>
          <FormControl>
            <LabelInput htmlFor="category_id" label="Jenis Barang" />
            <select
              name="category_id"
              id="category_id"
              value={1}
            //   onChange={(e) => setCategoryId(e.target.value)}
              className="text-white bg-white/5 p-3 rounded-lg w-full"
              required
            >
              <option value="">-- Pilih Kategori --</option>
              {/* {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-black">
                  {category.name}
                </option>
              ))} */}
            </select>
          </FormControl>
          <ButtonSubmit disabled={loading}>
            {loading ? "Menyimpan..." : "Update"}
          </ButtonSubmit>
        </form>
      </MainContainer>
    </div>
  );
}
