import Button from "../button";
import { Input, Label } from "../forms";
import { useUser } from "../auth";

export default function Login() {
  const { login } = useUser();

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        className="flex flex-col shadow-md rounded px-8 py-6 space-y-4"
        onSubmit={(event) => {
          const form = event.currentTarget;
          const rawInput = form.username.value;
          const username = rawInput.trim().toLowerCase();
          login(username);
          event.preventDefault();
        }}
      >
        <div>
          <div className="flex flex-wrap items-baseline justify-between">
            <Label htmlFor="username">Only two gym bros here...</Label>
          </div>
          <Input
            autoFocus
            autoComplete="off"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <Button type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
}
