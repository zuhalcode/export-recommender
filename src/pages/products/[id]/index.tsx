import { ImporterCard, Layout, Loading } from "@/components";
import { GlobalCategoryContext } from "@/context/GlobalCategoryContext";
import { NavbarContext } from "@/context/NavbarContext";
import { PredictionContext } from "@/context/PredictionContext";
import { axiosInstance } from "@/lib/axios";
import {
  GlobalCategoryContextType,
  Importer,
  NavbarContextType,
  PredictionContextType,
  Product,
} from "@/types/Types";
import { useRouter } from "next/router";

import React, { useContext, useEffect, useState } from "react";

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
    <Layout title="Importir Produk">
      <div className="container">
        <div className="relative z-10 px-10 pt-20">
          <h1 className="mb-5 text-center font-sans text-xl font-bold capitalize text-white">
            {product ? (
              `Importir untuk Produk : ${product?.name} ~ HSCODE ${product.hscode}`
            ) : (
              <Loading size="sm" />
            )}
          </h1>

          <div className="hidden-scroll container grid max-h-[470px] grid-cols-3 justify-between gap-10 overflow-y-auto px-10 pb-5">
            {importers ? (
              importers?.map((importer) => (
                <div
                  className="cursor-pointer rounded-md bg-gray-100 transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-gray-200"
                  key={importer.id}
                >
                  <ImporterCard
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
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
