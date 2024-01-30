import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3 h-[280px] w-[300px] p-5 gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
