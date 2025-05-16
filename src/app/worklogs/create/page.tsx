'use client'; // Jika kamu menggunakan App Router

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainContainer from "@/components/MainContainer";
import Breadcrumb from "@/components/Breadcrumb";
import FormControl from "@/components/FormControl";
import LabelInput from "@/components/LabelInput";
import InputForm from "@/components/InputForm";
import ButtonSubmit from "@/components/ButtonSubmit";
import Swal from "sweetalert2";
import transactionService from "@/services/transactionService";

export default function Page() {
//   const [productId, setProductId] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
//   const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // fetchProducts();
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await transactionService.createTransaction({
        // product_id: productId,
        transaction_date: transactionDate,
        quantity: Number(quantity),
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Transaksi berhasil disimpan!",
        timer: 2000,
        showConfirmButton: true,
      });

      setTimeout(() => {
        router.push("/transactions");
      }, 1500);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        let errorMessage = message;

        if (errors) {
          if (errors.product_id) errorMessage = errors.product_id[0];
          if (errors.transaction_date) errorMessage = errors.transaction_date[0];
          if (errors.quantity) errorMessage = errors.quantity[0];
        }

        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menyimpan transaksi.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Tambah Transaksi</h1>
      <MainContainer>
        <div className="flex justify-between mb-5">
          <Breadcrumb />
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormControl>
            <LabelInput htmlFor="transaction_date" label="Tanggal Transaksi" />
            <InputForm
                name="transaction_date"
                type="date"
                id="transaction_date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                required
            />
          </FormControl>

          <FormControl>
            <LabelInput htmlFor="quantity" label="Jumlah Barang" />
            <InputForm
                name="quantity"
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
                placeholder="Masukkan jumlah barang"
            />
          </FormControl>

          <ButtonSubmit disabled={loading}>
            {loading ? "Menyimpan..." : "Tambah Transaksi"}
          </ButtonSubmit>
        </form>
      </MainContainer>
    </div>
  );
}
