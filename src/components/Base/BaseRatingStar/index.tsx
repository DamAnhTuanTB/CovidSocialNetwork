import React, { useState } from 'react';
import { BaseRatingStarStyled } from './styled';

const StarRating = (props: any) => {
  const {
    rating = 0,
    setRating = () => { },
    isEdit = true,
  } = props;

  const [hover, setHover] = useState(0);
  return (
    <BaseRatingStarStyled className={isEdit ? "star-rating" : "star-disabled-rating"}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              if (isEdit)
                setRating(index);
            }}
            onMouseEnter={() => {
              if (isEdit)
                setHover(index);
            }}
            onMouseLeave={() => {
              if (isEdit)
                setHover(rating);
            }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </BaseRatingStarStyled>
  );
};

export default StarRating;