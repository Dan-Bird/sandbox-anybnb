import React from 'react';

import { sanityClient } from '../../sanity';
import Link from 'next/link';
import Image from '@/components/Image';
import Review from '@/components/Review';
import { Utils } from 'utils';
import styles from '@/styles/slug.module.css';

const Property = ({ property }) => {
  const numberOfReviews = property.reviews.length;
  return (
    <div className={styles.container}>
      <h1>
        <b>{property.title}</b>
      </h1>
      <p>
        {numberOfReviews} {Utils.isMultiple('review', numberOfReviews)}
      </p>

      <div className={styles.imagesSection}>
        <Image identifier="main-image" image={property.mainImage} />
        <div className={styles.subImagesSection}>
          {property.images.map((image, index) => (
            <React.Fragment key={index}>
              <Image identifier="image" image={property.images[index]} />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.information}>
          <h2>
            <b>
              {property.propertyType} hosted by {property.host?.name}
            </b>
          </h2>

          <h3>
            {property.bedrooms} {Utils.isMultiple('bedroom', property.bedrooms)}{' '}
            * {property.beds} {Utils.isMultiple('bed', property.beds)}
          </h3>
          <hr />
          <h4>Enhanced Clean</h4>
          <p>This host is comitted to Anybnb's enhanced cleaning process.</p>
          <h4>Amenities for Everyday Living</h4>
          <p>
            This host has equipped this property for long stays - kitchen,
            shampoo, conditioner, hairdryer included.
          </p>
          <h4>House Rules</h4>
          <p>This place is not suitable for pets. No smoking allowed.</p>
        </div>

        <div className={styles.priceBox}>
          <h2>£{property.pricePerNight}</h2>
          <h2>
            {numberOfReviews} {Utils.isMultiple('Review', numberOfReviews)}
          </h2>
          <Link href="/">
            <a className={styles.button}>Change Dates</a>
          </Link>
        </div>
      </div>

      <hr />

      <h4>{property.description}</h4>

      <hr />

      <h2>
        {numberOfReviews} {Utils.isMultiple('review', numberOfReviews)}
      </h2>

      {!!(numberOfReviews > 0) &&
        property.reviews.map(review => (
          <Review key={review._key} review={review} />
        ))}

      <hr />
    </div>
  );
};

export const getServerSideProps = async pageContext => {
  const pageSlug = pageContext.query.slug;
  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  return !property
    ? { props: null, notFound: true }
    : {
        props: {
          property,
        },
      };
};

export default Property;
