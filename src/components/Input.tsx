import { GlobalCategoryContext } from "@/context/GlobalCategoryContext";
import { axiosInstance } from "@/lib/axios";
import { capitalizeFirstChar } from "@/lib/helper";
import {
  GlobalCategoryContextType,
  InputProps,
  Placeholder,
} from "@/types/Types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

const Input = ({ filterBy = "products" }: InputProps) => {
  const router = useRouter();

  const context = useContext(
    GlobalCategoryContext,
  ) as GlobalCategoryContextType;

  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  let [placeholders, setPlaceholder] = useState<Placeholder[]>([]);
  const [input, setInput] = useState<string>("");

  const query: string = filterBy;
  const placeholder: string = placeholders?.[placeholderIndex]?.name;

  // const currentPlaceholder = placeholders?.[placeholderIndex];
  const currentPlaceholder = placeholders?.find((placeholder) =>
    input.toLowerCase().includes(placeholder.name),
  );

  const { category } = context;

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleProductClick = (dataName: string) => setInput(dataName);

  if (category === "trademap") {
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

  const isExactMatch = filteredPlaceholders.some((data) => data.name === input);

  const handleSearchOnClick = (query: any) => {
    console.log(query);
    if (!input) return;

    if (category === "trademap")
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
  }, [query]);

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
    <AnimatePresence>
      <div className="flex flex-col items-center ">
        <div className="flex w-full max-w-xl gap-3 rounded-t-xl bg-white px-3 pt-2">
          <motion.input
            type="text"
            className="w-full rounded-lg bg-gray-200 px-3 py-2 text-lg text-black focus:outline-none"
            onChange={handleInputOnchange}
            value={capitalizeFirstChar(input)}
            placeholder={
              placeholder ? capitalizeFirstChar(placeholder) : "Cari Produk"
            }
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          />

          {category === "trademap" ? (
            <button
              className="w-1/3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-base font-bold uppercase text-white"
              onClick={() => handleSearchOnClick(currentPlaceholder?.hscode)}
            >
              Search
            </button>
          ) : (
            <button
              className="w-1/3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-base font-bold uppercase text-white"
              onClick={() => handleSearchOnClick(currentPlaceholder?.id)}
            >
              Search
            </button>
          )}
        </div>
      </div>

      <div
        className={`mx-auto flex max-h-64 max-w-xl flex-col items-center justify-center overflow-y-auto rounded-b-xl bg-white pb-3 ${
          input ? "pt-3" : "pt-0"
        } ${isExactMatch ? "pt-0" : "pt-0"}`}
      >
        <ul className={`${(!input || isExactMatch) && "hidden"} w-full`}>
          {filteredPlaceholders.map((placeholder) => (
            <li
              key={placeholder.id}
              className={`w-full cursor-pointer bg-white px-3 py-2 capitalize hover:bg-slate-100`}
              onClick={() => handleProductClick(placeholder.name)}
            >
              {placeholder.name}
            </li>
          ))}
        </ul>
      </div>
    </AnimatePresence>
  );
};

export default Input;
