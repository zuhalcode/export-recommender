import { Product } from "@/types/Types";

const Card = ({ name, desc }: Product) => {
  return (
    <div className="space-y-2 px-5 py-3">
      <h2 className="font-mono text-2xl font-semibold">
        {name?.toUpperCase()}
      </h2>
      <p className="text-justify text-base font-medium text-gray-600">{desc}</p>
    </div>
  );
};

export default Card;
