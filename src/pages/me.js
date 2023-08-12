import LoadingIcon from '@/components/loading-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSignOut from '@/hooks/use-sign-out';
import withUser from '@/lib/with-user';

export default function Me({ user }) {
  const mutation = useSignOut({
    onSuccess: () => {
      window.reload();
    },
  });

  return (
    <div className='flex flex-1 flex-col gap-4 py-4'>
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

export const getServerSideProps = withUser();
