import { useUser } from "@auth0/nextjs-auth0";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <p>
        <img src={user.picture} alt={user.name} />
        <table>
          <tr><td>Name</td><td>{user.name}</td></tr>
          <tr><td>Email</td><td>{user.email}</td></tr>
        </table>
        </p>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
