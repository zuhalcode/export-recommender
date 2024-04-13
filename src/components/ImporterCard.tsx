import { Importer } from "@/types/Types";

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
  return (
    <div className="space-y-2 px-5 py-3">
      <h2 className="font-mono text-xl font-semibold capitalize">{name}</h2>

      <p className=" text-base font-medium text-gray-600">
        Koefisien Determinasi : {rSquared?.toFixed(2)}
      </p>
      <p className="text-justify text-base font-medium text-gray-600">
        Prediksi :{" "}
        {prediction?.toLocaleString("id-ID", { maximumFractionDigits: 2 })} USD
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
        Unit Value : {unit_value?.toLocaleString("id-ID")} USD / {quantity_unit}
      </p>
      <p className="text-justify text-base font-medium text-gray-600">
        MAE : {MAE?.toFixed(2)}
      </p>
      <p className="text-justify text-base font-medium text-gray-600">
        RMSE : {RMSE?.toFixed(2)}
      </p>
    </div>
  );
};

export default ImporterCard;
