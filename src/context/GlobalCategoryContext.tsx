import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type GlobalCategoryContextType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalCategoryContext = createContext<
  GlobalCategoryContextType | undefined
>(undefined);

const GlobalCategoryProvider = ({ children }: Props) => {
  const [category, setCategory] = useState<string>("hscode");

  return (
    <GlobalCategoryContext.Provider
      value={{ category: category, setCategory: setCategory }}
    >
      {children}
    </GlobalCategoryContext.Provider>
  );
};

// Custom hook for convenience
export const useCategory = () => {
  const context = useContext(GlobalCategoryContext);
  if (!context) {
    throw new Error(
      "useGlobalCategory must be used within a GlobalCategoryProvider",
    );
  }
  return context;
};

export { GlobalCategoryContext, GlobalCategoryProvider };
