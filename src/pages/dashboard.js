import withUser from '../lib/with-user';

export { default } from '../components/timeline';
export const getServerSideProps = withUser();
