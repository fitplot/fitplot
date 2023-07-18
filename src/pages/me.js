import withUser from '../lib/with-user';

export { default } from '../components/auth/pages/me';
export const getServerSideProps = withUser();
