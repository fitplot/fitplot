import withUser from '../lib/with-user';

export { default } from '../components/workouts/pages/workouts';
export const getServerSideProps = withUser();
