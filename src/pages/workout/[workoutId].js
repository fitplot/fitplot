import withUser from '../../lib/with-user';

export { default } from '../../components/workout/pages/workout';
export const getServerSideProps = withUser();
