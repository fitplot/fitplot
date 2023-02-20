import { useUser } from '../auth';
import Button from '../button';
import { Input, Label } from '../forms';

export default function Login() {
  const { login } = useUser();

  return (
    <div className='flex flex-1 justify-center items-center'>
      <form
        className='flex flex-col py-6 px-8 space-y-4 rounded shadow-md'
        onSubmit={(event) => {
          const form = event.currentTarget;
          const rawInput = form.username.value;
          const username = rawInput.trim().toLowerCase();
          login(username);
          event.preventDefault();
        }}
      >
        <div>
          <div className='flex flex-wrap justify-between items-baseline'>
            <Label htmlFor='username'>Only two gym bros here...</Label>
          </div>
          <Input autoFocus type='text' id='username' name='username' required />
        </div>
        <Button type='submit'>Sign In</Button>
      </form>
    </div>
  );
}
