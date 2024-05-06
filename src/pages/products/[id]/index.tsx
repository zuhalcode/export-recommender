import { ImporterCard, Loading } from "@/components";
import { GlobalCategoryContext } from "@/context/GlobalCategoryContext";
import { NavbarContext } from "@/context/NavbarContext";
import { PredictionContext } from "@/context/PredictionContext";
import { quicksand } from "@/fonts/GoogleFont";
import { axiosInstance } from "@/lib/axios";
import {
  GlobalCategoryContextType,
  Importer,
  NavbarContextType,
  PredictionContextType,
  Product,
} from "@/types/Types";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import React, { useContext, useEffect, useState } from "react";
import HomeButton from "@/components/HomeButton";

const ProductDetail = () => {
  const router = useRouter();

  const navbarContext = useContext(NavbarContext) as NavbarContextType;
  const context = useContext(
    GlobalCategoryContext,
  ) as GlobalCategoryContextType;

  const predictionContext = useContext(
    PredictionContext,
  ) as PredictionContextType;

  const [product, setProduct] = useState<Product>();
  const [importers, setImporters] = useState<Importer[]>([]);

  const { setNavbar } = navbarContext;
  const { setCategory } = context;
  const { prediction } = predictionContext;
  const { id } = router.query;

  const sortBy = prediction;

  useEffect(() => {
    setNavbar(false);
    setCategory("prediction");

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
  }, [id, setCategory, setNavbar]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (product) {
          const importerResponse = await axiosInstance.get(
            `http://localhost:3001/api/regression/${product.hscode}/${sortBy}`,
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
  }, [product, sortBy]);

  return (
    <div className={`${quicksand.className} bg-[#262939] px-10 pb-0 pt-5 `}>
      <div className="flex flex-col items-center justify-center gap-3 pb-8">
        <HomeButton />
        <h1 className="text-center text-3xl font-medium capitalize text-white">
          {product ? (
            `Importir untuk Produk : ${product?.name} ~ HSCODE ${product.hscode}`
          ) : (
            <Loading size="sm" />
          )}
        </h1>
      </div>

      <div className="hidden-scroll grid max-h-[28.83rem] grid-cols-3 gap-7 overflow-y-auto overflow-x-hidden pb-3">
        {importers ? (
          importers?.map((importer) => (
            <ImporterCard
              key={importer.id}
              name={importer.name}
              prediction={importer.prediction || 0}
              trade_balance={importer.trade_balance || 0}
              quantity_imported={importer.quantity_imported || 0}
              quantity_unit={importer.quantity_unit}
              unit_value={importer.unit_value || 0}
              value_imported={importer.value_imported || 0}
              MAE={importer.MAE || 0}
              RMSE={importer.RMSE || 0}
              rSquared={importer.rSquared || 0}
            />
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

export default ProductDetail;
