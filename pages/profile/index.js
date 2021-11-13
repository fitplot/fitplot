import { useUser } from "@auth0/nextjs-auth0";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  const handleCheckin = () => {
    fetch("/api/checkin?id=" + user.sub, {
      method: "POST"
    })
      .then(response => response.text())
      .then(response => {
        console.log(response);
      });
  };

  const getHandleCheckins = () => {
    fetch("/api/checkin?id=" + user.sub)
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <p>
          <img src={user.picture} alt={user.name} />
          <table>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Nickname</td>
              <td>{user.nickname}</td>
            </tr>
            <tr>
              <td>User Id</td>
              <td>{user.sub}</td>
            </tr>
          </table>
          <button onClick={handleCheckin}>Check In!</button>
          <button onClick={getHandleCheckins}>See your current checkins</button>
        </p>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
