import { PredictionContext } from "@/context/PredictionContext";
import { quicksand } from "@/fonts/GoogleFont";
import { Importer, PredictionContextType } from "@/types/Types";
import { useContext } from "react";

const ImporterCard = ({
  name,
  prediction,
  quantity_imported,
  quantity_unit,
  trade_balance,
  unit_value,
  value_imported,
  MAE,
  RMSE,
  rSquared,
}: Importer) => {
  const predictionContext = useContext(
    PredictionContext,
  ) as PredictionContextType;

  const data = predictionContext;

  return (
    <div
      className={`${quicksand.className} cursor-pointer space-y-2 border border-[#383947] bg-[#212332] px-5 py-3 transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#303248]`}
    >
      <h2 className="text-xl font-semibold capitalize text-white">{name}</h2>

      {data?.prediction === "r" ? (
        <>
          <p className="text-justify text-base font-normal text-blue-400">
            Koefisien Determinasi : {rSquared?.toFixed(2)}
          </p>
          <p
            className={`text-justify text-base font-normal ${
              prediction !== undefined && prediction <= 0
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Prediksi : {""}
            {prediction?.toLocaleString("id-ID", {
              maximumFractionDigits: 0,
            })}{" "}
            USD
          </p>
          <p className="text-justify text-base font-medium text-white">
            Neraca Perdagangan : {trade_balance?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-white">
            Kuantitas Impor : {quantity_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-white">
            Nilai Impor : {value_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium capitalize text-white">
            Estimasi Harga : {unit_value?.toLocaleString("id-ID")} USD /{" "}
            {quantity_unit}
          </p>
          <p className="text-justify text-base font-medium text-violet-600">
            MAE : {MAE?.toFixed(2)}
          </p>
          <p className="text-justify text-base font-medium text-teal-600">
            RMSE : {RMSE?.toFixed(2)}
          </p>
        </>
      ) : (
        <>
          <p
            className={`text-justify text-base font-medium ${
              prediction !== undefined && prediction <= 0
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Prediksi :{" "}
            {prediction?.toLocaleString("id-ID", { maximumFractionDigits: 0 })}{" "}
            USD
          </p>

          <p className="text-justify text-base font-medium text-white">
            Neraca Perdagangan : {trade_balance?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-white">
            Kuantitas Impor : {quantity_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-white">
            Nilai Impor : {value_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium capitalize text-white">
            Estimasi Harga : {unit_value?.toLocaleString("id-ID")} USD /{" "}
            {quantity_unit}
          </p>

          <p className=" text-base font-medium text-blue-600">
            Koefisien Determinasi : {rSquared?.toFixed(2)}
          </p>
          <p className="text-justify text-base font-medium text-violet-600">
            MAE : {MAE?.toFixed(2)}
          </p>
          <p className="text-justify text-base font-medium text-teal-600">
            RMSE : {RMSE?.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
};

export default ImporterCard;
