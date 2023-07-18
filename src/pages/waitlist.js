import withUser from '../lib/with-user';

export { default } from '../components/waitlist';
export const getServerSideProps = withUser({ required: false });
