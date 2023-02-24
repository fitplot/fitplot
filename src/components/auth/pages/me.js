import useSignOut from '../../../hooks/use-sign-out';
import Button from '../../button';
import { Input, Label } from '../../forms';
import LoadingIcon from '../../loading-icon';
import { H1 } from '../../typography';

export default function Me({ user }) {
  const mutation = useSignOut({
    onSuccess: () => {
      window.location = '/';
    },
  });

  return (
    <div className='flex flex-col flex-1 space-y-4'>
      <H1>{user.firstName}</H1>
      <Label htmlFor='email'>Email</Label>
      <Input type='text' id='email' readonly disabled value={user.email} />
      <Button
        className='flex justify-center items-center'
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate()}
      >
        {mutation.isLoading ? <LoadingIcon className='w-6 h-6' /> : 'Sign Out'}
      </Button>
    </div>
  );
}
