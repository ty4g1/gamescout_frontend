import {Navbar as NavbarUI, NavbarBrand, NavbarContent, NavbarItem, Image } from "@heroui/react"
import FilterDrawer from "./FilterDrawer"
import Teemo from '../assets/teemo.svg'

export default function Navbar() {
  return (
    <NavbarUI className="absolute bg-steam-primary text-white">
      <NavbarBrand>
        <Image src={Teemo} height={50} width={50}/>
        <p className="text-2xl font-bold text-inherit pl-2">GameScout</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <FilterDrawer/>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}
