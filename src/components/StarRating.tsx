import { Rating } from "@/types/product";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React from "react";
import { Label } from "./ui/label";

const StarRating: React.FC<{ rating: Rating }> = ({ rating }) => {
  return (
    <div className="flex gap-0">
      {[...Array(Math.floor(rating.rate))].map((_el, i) => (
        <StarFilledIcon key={i} />
      ))}
      {[...Array(5 - Math.floor(rating.rate))].map((_el, i) => (
        <StarIcon fill={rating.rate / 5 > i ? "#000" : "red"} key={i} />
      ))}
      <Label>({rating.count})</Label>
    </div>
  );
};

export default StarRating;
