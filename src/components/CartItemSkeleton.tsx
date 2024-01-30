import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton: React.FC = () => {
  return (
    <div className="w-[500px] h-[80px] cursor-pointer flex justify-center items-center gap-2">
      <Skeleton className="w-[50px] h-[50px]" />
      <div className="w-4/5 flex flex-col gap-1">
        <Skeleton className="h-[36px] w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-[90px]" />
          <Skeleton className="h-4 w-[120px]" />
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
