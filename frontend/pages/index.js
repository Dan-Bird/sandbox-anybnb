import { sanityClient, urlFor } from '../sanity';
import Link from 'next/link';
import { Utils } from 'utils';
import styles from '@/styles/index.module.css';

const index = ({ properties }) => {
  return (
    <>
      {!!properties && (
        <div className={styles.main}>
          <div className={styles.feedContainer}>
            <h1>Places to Stay Near You</h1>
            <div className={styles.feed}>
              {properties.map((property, index) => (
                <Link href={`property/${property.slug.current}`}>
                  <div key={property._id} className={styles.card}>
                    <img src={urlFor(property.mainImage)} />
                    <p>
                      {property.reviews.length}{' '}
                      {Utils.isMultiple('review', property.reviews.length)}
                    </p>
                    <h2>{property.title}</h2>
                    <h3>£{property.pricePerNight}/per night</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[ _type == "property" ]';
  const properties = await sanityClient.fetch(query);

  return {
    props: {
      properties: properties.length ? properties : [],
    },
  };
};

export default index;
