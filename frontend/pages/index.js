import { sanityClient } from '../sanity';

const index = ({ properties }) => {
  return <div></div>;
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
