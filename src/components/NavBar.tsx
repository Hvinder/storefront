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
        <Label className="text-white cursor-pointer text-lg">Cart</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/72211410?v=4"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
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
