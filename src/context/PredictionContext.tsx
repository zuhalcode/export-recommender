import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type PredictionContextType = {
  prediction: string;
  setPrediction: React.Dispatch<React.SetStateAction<string>>;
};

const PredictionContext = createContext<PredictionContextType | undefined>(
  undefined,
);

const PredictionProvider = ({ children }: Props) => {
  const [prediction, setPrediction] = useState<string>("trademap");

  return (
    <PredictionContext.Provider
      value={{ prediction: prediction, setPrediction: setPrediction }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export { PredictionContext, PredictionProvider };
