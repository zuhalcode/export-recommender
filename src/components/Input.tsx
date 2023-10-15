import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

const Input = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);

  // Array of placeholder texts
  const placeholders: string[] = useMemo(
    () => [
      "Chocolate",
      "Coffee",
      "Tea",
      "Rice",
      "Spices",
      "Cheese",
      "Olive oil",
      "Fresh fruits",
      "Fresh vegetables",
      "Canned fruits",
      "Canned vegetables",
      "Pasta",
      "Seafood",
      "Canned soups",
      "Honey",
      "Baked goods",
      "Snack foods",
      "Condiments",
      "Dairy products",
      "Breakfast cereals",
      "Frozen foods",
      "Soft drinks",
      "Fruit juices",
      "Beer",
      "Whiskey",
      "Sauces",
      "Canned seafood",
      "Nuts",
      "Pickles",
      "Jams and preserves",
      "Ice cream",
      "Baby food",
      "Vinegar",
      "Frozen desserts",
      "Instant noodles",
      "Cooking oil",
      "Energy drinks",
      "Herbal tea",
      "Health supplements",
      "Organic foods",
      "Nut butter",
      "Dairy alternatives",
      "Gourmet chocolates",
      "Hot sauce",
      "Popcorn",
      "Salad dressings",
      "Energy bars",
      "Dried fruits",
    ],
    [],
  );

  useEffect(() => {
    // Function to change the placeholder text after 2 seconds
    const changePlaceholder = () => {
      setPlaceholderIndex((prevIndex) =>
        prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1,
      );
    };

    // Call the function to change the placeholder text
    const intervalId = setInterval(changePlaceholder, 2000); // Rotate every 2 seconds

    // Cleanup the interval to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [placeholders]);

  console.log(placeholders[placeholderIndex]);

  return (
    <AnimatePresence>
      <motion.input
        type="text"
        className="w-full rounded-lg  px-3 py-2 text-lg text-gray-700 focus:outline-none"
        placeholder={placeholders[placeholderIndex]}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
      />
    </AnimatePresence>
  );
};

export default Input;
