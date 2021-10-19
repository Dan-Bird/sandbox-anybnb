import { urlFor } from 'sanity';
import styles from '@/styles/Image.module.css';

const Image = ({ identifier, image }) => {
  const className =
    identifier === 'main-image' ? styles.mainImage : styles.image;

  return (
    <div className={className}>
      <img src={urlFor(image)} alt="" />
    </div>
  );
};

export default Image;
