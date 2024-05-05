import { PredictionContext } from "@/context/PredictionContext";
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
    <div className="space-y-2 px-5 py-3">
      <h2 className="font-mono text-xl font-semibold capitalize">{name}</h2>

      {data?.prediction === "r" ? (
        <>
          <p className="text-base font-medium text-blue-400">
            Koefisien Determinasi : {rSquared?.toFixed(2)}
          </p>
          <p
            className={`text-justify text-base font-medium ${
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
          <p className="text-justify text-base font-medium text-gray-600">
            Neraca Perdagangan : {trade_balance?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-gray-600">
            Kuantitas Impor : {quantity_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-gray-600">
            Nilai Impor : {value_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium capitalize text-gray-600">
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

          <p className="text-justify text-base font-medium text-gray-600">
            Neraca Perdagangan : {trade_balance?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-gray-600">
            Kuantitas Impor : {quantity_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium text-gray-600">
            Nilai Impor : {value_imported?.toLocaleString("id-ID")} USD
          </p>
          <p className="text-justify text-base font-medium capitalize text-gray-600">
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
