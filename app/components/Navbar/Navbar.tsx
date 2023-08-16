"use client";

import { INavbarProps } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { Categories } from "./Categories";

const Navbar: React.FC<INavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-md">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row item-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu user={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;
