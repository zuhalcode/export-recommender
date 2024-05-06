import { Product } from "@/types/Types";

const Card = ({ name, desc }: Product) => {
  return (
    <div className="cursor-pointer space-y-2 border border-[#383947] bg-[#212332] px-5 py-3 transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#303248]">
      <h2 className="font-mono text-2xl font-medium capitalize text-white">
        {name}
      </h2>
      <p className="text-justify text-base font-normal text-white">{desc}</p>
    </div>
  );
};

export default Card;
