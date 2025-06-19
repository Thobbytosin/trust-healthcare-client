import { StarHalfIcon, StarOutlineIcon, StarRateIcon } from "@/icons/icons";
import React, { FC } from "react";

type Props = {
  color: string;
  rating: number | undefined;
  size?: string;
};

const Ratings: FC<Props> = ({ color, rating, size }) => {
  const starsArray = [];

  if (rating) {
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsArray.push(
          <StarRateIcon
            key={i}
            color="inherit"
            fontSize="inherit"
            // push the full stars aslong rating is >= 1 and <= 5
          />
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        starsArray.push(
          <StarHalfIcon key={i} color="inherit" fontSize="inherit" />
        );
        // push the half star for decimals rating ()
      } else {
        starsArray.push(
          <StarOutlineIcon key={i} color="inherit" fontSize="inherit" />
        );
        // push empty star when the rating count stops
      }
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      starsArray.push(
        <StarOutlineIcon key={"empty"} color="inherit" fontSize="inherit" />
      );
    }
  }
  return (
    <div className={`${color} ${size} flex items-center `}>{starsArray}</div>
  );
};

export default Ratings;
