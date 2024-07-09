import { quicksand } from "@/fonts/GoogleFont";
import { Importer } from "@/types/Types";

const ImporterCard = ({
  name,
  prediction,
  quantity_imported,
  quantity_unit,
  trade_balance,
  unit_value,
  value_imported,
}: Importer) => {
  return (
    <div
      className={`${quicksand.className} cursor-pointer space-y-2 border border-[#383947] bg-[#1d202d] px-5 py-3 transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#303248]`}
    >
      <h2 className="text-xl font-semibold capitalize text-white">{name}</h2>

      <p
        className={`text-justify text-base font-medium ${
          prediction !== undefined && prediction <= 0
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        Prediksi :{" "}
        {prediction?.toLocaleString("id-ID", { maximumFractionDigits: 0 })} USD
      </p>

      <p className={`text-justify text-base font-medium text-white`}>
        Neraca Perdagangan :{" "}
        <span
          className={`${
            trade_balance !== undefined && trade_balance <= 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {trade_balance?.toLocaleString("id-ID")} USD
        </span>
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
    </div>
  );
};

export default ImporterCard;
