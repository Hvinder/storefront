import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3 h-[300px] w-[300px]">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
