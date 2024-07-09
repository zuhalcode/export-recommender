import { quicksand } from "@/fonts/GoogleFont";

import { useCategory } from "@/context/GlobalCategoryContext";

import { motion } from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";
import { Placeholder } from "@/types/Types";
import { axiosInstance } from "@/lib/axios";
import { capitalizeFirstChar } from "@/lib/helper";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const menus = [
    { name: "hscode", query: "hscode" },
    { name: "produk", query: "produk" },
  ];

  const router = useRouter();

  const { setCategory, category } = useCategory();

  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  let [placeholders, setPlaceholder] = useState<Placeholder[]>([]);
  const [input, setInput] = useState<string>("");

  const query: string = category === "hscode" ? "trademap" : "products";

  const placeholder: string = placeholders?.[placeholderIndex]?.name;

  if (category === "hscode") {
    placeholders = placeholders.map((trademap) => ({
      hscode: trademap.hscode,
      name: `${trademap.hscode} : ${trademap.name}`,
    }));
  }

  const filteredPlaceholders = placeholders.filter(
    (data) =>
      data.name.toLowerCase().startsWith(input.toLowerCase()) ||
      data.name.toLowerCase().includes(input.toLowerCase()),
  );

  const currentPlaceholder = placeholders?.find((placeholder) =>
    input.toLowerCase().includes(placeholder.name),
  );

  const isExactMatch = filteredPlaceholders.some((data) => data.name === input);

  const handleChangeCategory = (category: any) => setCategory(category);

  const handleProductClick = (dataName: string) => setInput(dataName);

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleSearchOnClick = (query: any) => {
    if (!input) return;

    if (category === "hscode")
      router.push(`/products/hscode/${query.toString()}`);
    else router.push(`/products/${query}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3001/api/${query}`,
        );
        setPlaceholder(response?.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [query, setCategory]);

  useEffect(() => {
    setCategory("hscode");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Function to change the placeholder text after 2 seconds
    const changePlaceholder = () => {
      if (!input) {
        setPlaceholderIndex((prevIndex) =>
          placeholders ? (isNaN(prevIndex + 1) ? 0 : prevIndex + 1) : prevIndex,
        );
      }
    };

    // Call the function to change the placeholder text
    const intervalId = setInterval(changePlaceholder, 2000); // Rotate every 2 seconds

    // Cleanup the interval to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [placeholders, input]);

  return (
    <main className="bg-export-2 relative z-0 min-h-screen w-full">
      <Head>
        <title>Halaman Utama</title>
      </Head>
      {/* Layer */}
      <div className="absolute bottom-0 top-0 z-10 w-full bg-gradient-to-r from-[#4141a5] to-[#12428e] opacity-75" />
      {/* Layer */}

      <div className={`${quicksand.className} relative z-10 pt-5`}>
        <div className="space-y-3 p-10">
          <h1 className="text-center text-5xl font-medium text-white ">
            Temukan Rekomendasi Produk Ekspor Anda
          </h1>

          <p className="text-center text-2xl text-white">
            Membantu anda menemukan produk untuk ekspor beserta tujuannya
          </p>
        </div>

        {/* Search Box */}
        <div className="flex items-center justify-center">
          <div className="w-full">
            <ul className={`mx-auto flex w-[70%] pl-4 font-medium text-white`}>
              {menus.map((menu, i) => (
                <motion.li
                  key={i}
                  className={`cursor-pointer rounded-t-sm ${
                    category === menu.name ? "bg-[#6661e9]" : "bg-none"
                  } px-3 py-2 capitalize outline-none`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleChangeCategory(menu.query)}
                >
                  {menu.name}
                </motion.li>
              ))}
            </ul>

            <div className="mx-auto flex w-[70%] items-center rounded-md bg-[#3861B3] bg-opacity-80 p-4">
              <input
                type="text"
                className="w-full rounded-l bg-[#2C3B75] px-4 py-2 font-medium text-white outline-none placeholder:text-slate-400"
                onChange={handleInputOnchange}
                value={capitalizeFirstChar(input)}
                placeholder={
                  placeholder ? capitalizeFirstChar(placeholder) : "Cari Produk"
                }
              />

              {category === "hscode" ? (
                <button
                  className="rounded-r bg-blue-500 px-4 py-2 font-medium text-white transition-all duration-100 hover:bg-blue-600"
                  onClick={() =>
                    handleSearchOnClick(currentPlaceholder?.hscode)
                  }
                >
                  Search
                </button>
              ) : (
                <button
                  className="rounded-r bg-blue-500 px-4 py-2 font-medium text-white transition-all duration-100 hover:bg-blue-600"
                  onClick={() => handleSearchOnClick(currentPlaceholder?.id)}
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Search Box */}

        <div
          className="mx-auto mt-3 max-h-64 w-[70%] overflow-y-auto rounded-sm 
            bg-white"
        >
          <ul className={`${(!input || isExactMatch) && "hidden"} w-full`}>
            {filteredPlaceholders.map((placeholder) => (
              <li
                key={placeholder.id}
                className={`w-full cursor-pointer bg-gray-100 px-3 py-2 capitalize hover:bg-slate-200`}
                onClick={() => handleProductClick(placeholder.name)}
              >
                {placeholder.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
