import { Card, Layout } from "@/components";
import React from "react";

const Products = () => {
  return (
    <Layout>
      <div className="container h-screen">
        <div className=" bg-blue-500 px-10 py-24">
          <h1 className="text-center font-sans text-xl font-bold">
            HSCODE 0301 Live Animal
          </h1>
          <div className="container flex justify-between gap-10 bg-red-500 px-10">
            {[1, 2, 3, 4, 5].map((value) => (
              <Card key={value} value={value} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
