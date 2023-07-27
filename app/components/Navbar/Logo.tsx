"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      className="hideen md:block cursor-pointer object-contain"
      height={100}
      width={100}
    />
  );
};
export default Logo;
