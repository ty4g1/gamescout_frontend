import {Navbar as NavbarUI, NavbarBrand, NavbarContent, NavbarItem, Image } from "@heroui/react"
import FilterDrawer from "./FilterDrawer"
import HelpPopover from "./HelpPopover";
import Teemo from '../assets/teemo.svg'
import type { Filters } from "../types/api";

export default function Navbar({ filters, setFilters }: { filters: Filters, setFilters: (filters: Filters) => void }) {
  return (
    <NavbarUI className="bg-steam-primary text-white">
      <NavbarBrand>
        <Image src={Teemo} height={50} width={50}/>
        <p className="text-2xl font-bold text-inherit pl-2">GameScout</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <HelpPopover/>
        </NavbarItem>
        <NavbarItem>
          <FilterDrawer filters={filters} setFilters={setFilters}/>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}
