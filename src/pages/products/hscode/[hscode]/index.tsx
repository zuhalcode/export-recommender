import { Card, Loading } from "@/components";
import { quicksand } from "@/fonts/GoogleFont";
import { axiosInstance } from "@/lib/axios";
import { Product, Trademap } from "@/types/Types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HomeButton from "@/components/HomeButton";
import Head from "next/head";
import ChartButton from "@/components/ChartButton";
const ProductsByHscode = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [trademap, setTrademap] = useState<Trademap>();

  const { hscode } = router.query;

  const handleProductOnclick = (productId: any) => {
    router.push(`/products/${productId}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (hscode) {
          const trademapResponse = await axiosInstance.get(
            `http://localhost:3001/api/trademap/${hscode}`,
          );

          const productResponse = await axiosInstance.get(
            `http://localhost:3001/api/products/hscode/${hscode}`,
          );

          setTimeout(() => {
            setProducts(productResponse?.data.data);
            setTrademap(trademapResponse?.data.data);
          }, 800);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [hscode]);

  return (
    <div className={`${quicksand.className} bg-[#262939] px-10 pb-0 pt-5`}>
      <Head>
        <title>Produk</title>
      </Head>
      <div className="flex flex-col items-center justify-center gap-3 pb-14">
        <HomeButton />
        <h1 className="text-center text-3xl font-medium text-white">
          {!trademap && products.length === 0 && (
            <div className="flex justify-center">
              <Loading size="md" />
            </div>
          )}
          {trademap && `HSCODE ${trademap.hscode}`}
        </h1>

        <h2 className="text-center text-lg font-semibold capitalize text-slate-300">
          {trademap?.name}
        </h2>
      </div>

      <div className="hidden-scroll grid max-h-[25.86rem] min-h-[25rem] grid-cols-3 gap-7 overflow-y-auto overflow-x-hidden pb-3">
        {products ? (
          products?.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductOnclick(product.id)}
            >
              <Card name={product.name} desc={product.desc} />
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsByHscode;
