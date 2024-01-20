import Image from "next/image";
import { Settings } from "lucide-react";
import { useEffect } from "react";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-[5vh] bg-white">
      <div className="px-5">
        <Image height={50} width={200} src={"/logo.svg"} alt="logo" />
      </div>
      <div className="px-5">
        <Settings className="h-6 w-6 text-[#5F6368]" />
      </div>
    </div>
  );
};
