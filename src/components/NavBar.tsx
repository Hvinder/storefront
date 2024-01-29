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

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAccessToken(undefined));
    navigate("/login");
  };
  return (
    <div className="w-full h-20 bg-black flex items-center justify-end px-16">
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
          className="cursor-pointer hover:bg-slate-100"
          onClick={handleLogout}
        >
          <Label>Logout</Label>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavBar;