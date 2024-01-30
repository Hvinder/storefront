import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/features/storeSlice";
import { ExitIcon } from "@radix-ui/react-icons";
import CartIcon from "./CartIcon";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAccessToken(undefined));
    navigate("/login");
  };
  return (
    <div className="w-full h-20 bg-black flex items-center justify-between px-16">
      <Label
        className="text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        STOREFRONT
      </Label>
      <div className="flex items-center gap-10">
        <div className="cursor-pointer" onClick={() => navigate("/cart")}>
          <CartIcon />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer border-2 border-solid border-white">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/72211410?v=4"
                alt="@shadcn"
              />
              <AvatarFallback>HV</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            className="cursor-pointer hover:bg-slate-100 flex justify-between"
            onClick={handleLogout}
          >
            <Label>Logout</Label>
            <ExitIcon />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavBar;
