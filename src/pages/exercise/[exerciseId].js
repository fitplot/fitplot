import withUser from '../../lib/with-user';

export { default } from '../../components/exercise';
export const getServerSideProps = withUser();
