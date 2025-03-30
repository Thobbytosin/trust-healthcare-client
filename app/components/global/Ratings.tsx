import {
  StarHalfIcon,
  StarOutlineIcon,
  StarRateIcon,
} from "../../../app/icons/icons";
import React, { FC } from "react";

type Props = {
  color: string;
  rating: number;
};

const Ratings: FC<Props> = ({ color, rating }) => {
  const starsArray = [];

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
  return <div className={`${color} flex items-center `}>{starsArray}</div>;
};

export default Ratings;
