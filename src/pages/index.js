import withUser from '../lib/with-user';

export { default } from '../components/home';
export const getServerSideProps = withUser({ required: false });
