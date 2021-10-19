import React from 'react';
import { urlFor } from 'sanity';
import styles from '@/styles/Review.module.css';

const Review = ({ review }) => {
  return (
    <div className={styles.reviewBox}>
      <h1>{review.rating}</h1>
      <h2>{review.traveller.name}</h2>
      <img
        src={urlFor(review.traveller.image)
          .width(50)
          .height(50)
          .crop('focalpoint')
          .auto('format')}
        alt=""
      />
    </div>
  );
};

export default Review;
