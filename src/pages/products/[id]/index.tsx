import { ImporterCard, Loading } from "@/components";
import { quicksand } from "@/fonts/GoogleFont";
import { axiosInstance } from "@/lib/axios";
import { Importer, Product } from "@/types/Types";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import HomeButton from "@/components/HomeButton";
import Head from "next/head";

const ProductDetail = () => {
  const router = useRouter();

  const [product, setProduct] = useState<Product>();
  const [importers, setImporters] = useState<Importer[]>([]);

  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const productResponse = await axiosInstance.get(
            `http://localhost:3001/api/products/${id}`,
          );

          setProduct(productResponse?.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (product) {
          const importerResponse = await axiosInstance.get(
            `http://localhost:3001/api/regression/${product.hscode}`,
          );

          const importersData = importerResponse?.data.data.result;

          const filteredImporters = importersData.filter(
            (importer: any) => typeof importer.prediction === "number",
          );

          setImporters(filteredImporters);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [product]);

  return (
    <>
      <Head>
        <title>Importir</title>
      </Head>
      <div
        className={`${quicksand.className} min-h-full bg-[#262939] px-10 pb-0 pt-5 `}
      >
        <div className="flex flex-col items-center justify-center gap-3 pb-8">
          <div className="flex space-x-3">
            <HomeButton />
          </div>

          <h1 className="text-center text-3xl font-medium capitalize text-white">
            {product &&
              `Importir untuk Produk : ${product?.name} ~ HSCODE ${product.hscode}`}
          </h1>
        </div>

        {importers.length === 0 && <Loading size="xxl" />}

        <div className="hidden-scroll grid max-h-[28.83rem] grid-cols-3 gap-7 overflow-y-auto overflow-x-hidden pb-3">
          {importers?.map((importer) => (
            <ImporterCard
              key={importer.id}
              name={importer.name}
              prediction={importer.prediction || 0}
              trade_balance={importer.trade_balance || 0}
              quantity_imported={importer.quantity_imported || 0}
              quantity_unit={importer.quantity_unit}
              unit_value={importer.unit_value || 0}
              value_imported={importer.value_imported || 0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
