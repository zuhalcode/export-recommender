import { Card, Layout, Loading } from "@/components";
import { NavbarContext } from "@/context/NavbarContext";
import { axiosInstance } from "@/lib/axios";
import { NavbarContextType, Product, Trademap } from "@/types/Types";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const ProductsByHscode = () => {
  const navbarContext = useContext(NavbarContext) as NavbarContextType;

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [trademap, setTrademap] = useState<Trademap>();

  const { hscode } = router.query;

  const { setNavbar } = navbarContext;

  const handleProductOnclick = (productId: any) => {
    router.push(`/products/${productId}`);
  };

  useEffect(() => {
    setNavbar(false);

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
  }, [hscode, setNavbar]);

  return (
    <Layout>
      <div className="container">
        <div className="relative z-10 px-10 pt-20">
          <h1 className="mb-5 text-center font-sans text-xl font-bold text-white">
            {!trademap && products.length === 0 && (
              <div className="flex justify-center">
                <Loading />
              </div>
            )}

            {trademap && `HSCODE ${trademap.hscode} : ${trademap.name}`}
          </h1>

          <div className="hidden-scroll container grid max-h-[29rem] grid-cols-3 justify-between gap-10 overflow-y-auto px-10 pb-5">
            {products ? (
              products?.map((product) => (
                <div
                  className="cursor-pointer rounded-md bg-gray-100 transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-gray-200"
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
      </div>
    </Layout>
  );
};

export default ProductsByHscode;
