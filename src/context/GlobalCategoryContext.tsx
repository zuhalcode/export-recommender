import { ReactNode, createContext, useState } from "react";

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
  const [category, setCategory] = useState<string>("trademap");

  return (
    <GlobalCategoryContext.Provider
      value={{ category: category, setCategory: setCategory }}
    >
      {children}
    </GlobalCategoryContext.Provider>
  );
};

export { GlobalCategoryContext, GlobalCategoryProvider };
