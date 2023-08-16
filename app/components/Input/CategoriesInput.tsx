"use client";
import { ICategoryInputProps } from "@/app/types";

const CategoriesInput: React.FC<ICategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex items-center gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default CategoriesInput;
