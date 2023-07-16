import useSignOut from '../../../hooks/use-sign-out';
import Button from '../../button';
import { Input, Label } from '../../forms';
import LoadingIcon from '../../loading-icon';
import { H1 } from '../../typography';

export default function Me({ user }) {
  const mutation = useSignOut({
    onSuccess: () => {
      window.reload();
    },
  });

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <H1>{user.firstName}</H1>
      <Label htmlFor='email'>Email</Label>
      <Input type='text' id='email' readOnly disabled value={user.email} />
      <Button
        className='flex items-center justify-center'
        disabled={mutation.isLoading}
        onClick={() => mutation.mutate()}
      >
        {mutation.isLoading ? <LoadingIcon className='h-6 w-6' /> : 'Sign Out'}
      </Button>
    </div>
  );
}
