"use client";

import { usePathname, useSearchParams } from "next/navigation";
import CategoriesBox from "../CategoriesBox";
import Container from "../Container";
import { categories } from "@/app/Constant";

export const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  if (!(pathname === "/")) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoriesBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};
