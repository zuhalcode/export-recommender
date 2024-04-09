import { axiosInstance } from "@/lib/axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Input = () => {
  type Placeholder = {
    id?: number;
    name: string;
  };

  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [placeholders, setPlaceholder] = useState<Placeholder[]>([]);
  const [input, setInput] = useState<string>("");

  const placeholder: string = placeholders?.[placeholderIndex]?.name;

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleProductClick = (productName: string) => setInput(productName);

  const capitalizeFirstChar = (text: string): string =>
    text?.charAt(0).toUpperCase() + text?.slice(1);

  const filteredPlaceholders = placeholders.filter((product) =>
    product.name.toLowerCase().startsWith(input.toLowerCase()),
  );

  const isExactMatch = filteredPlaceholders.some(
    (product) => product.name === input,
  );

  const handleSearchOnClick = async () => {
    const inputValue: string = input;
    console.log("input : ", inputValue);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3001/api/products",
        );
        setPlaceholder(response?.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
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
    <AnimatePresence>
      <div className="flex flex-col items-center ">
        <div className="flex w-full max-w-xl gap-3 rounded-t-xl bg-white px-3 pt-2">
          <motion.input
            type="text"
            className="w-full rounded-lg bg-gray-200 px-3 py-2 text-lg text-gray-800 focus:outline-none"
            onChange={handleInputOnchange}
            value={input}
            placeholder={
              placeholder ? capitalizeFirstChar(placeholder) : "Cari Produk"
            }
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          />

          <button
            className="w-1/3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-base font-bold uppercase text-white"
            onClick={handleSearchOnClick}
          >
            Search
          </button>
        </div>
      </div>

      <div
        className={`mx-auto flex max-h-64 max-w-xl flex-col items-center justify-center overflow-y-auto rounded-b-xl bg-white pb-3 ${
          input ? "pt-3" : "pt-0"
        } ${isExactMatch ? "pt-0" : "pt-0"}`}
      >
        <ul className={`${(!input || isExactMatch) && "hidden"} w-full`}>
          {filteredPlaceholders.map((product) => (
            <li
              key={product.id}
              className="w-full cursor-pointer bg-white px-3 py-2 hover:bg-slate-100"
              onClick={() => handleProductClick(product.name)}
            >
              {capitalizeFirstChar(product.name)}
            </li>
          ))}
        </ul>
      </div>
    </AnimatePresence>
  );
};

export default Input;
