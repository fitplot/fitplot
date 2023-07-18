import withUser from '../lib/with-user';

export { default } from '../components/exercises';
export const getServerSideProps = withUser();
