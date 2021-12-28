import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Button from "../../components/button";
import Nav from "../../components/nav";
import { useUser } from "../../components/auth";

export default function Profile() {
  const router = useRouter();
  const user = useUser();

  const {
    data: checkins,
    error: checkinsError,
    isLoading: isLoadingCheckins
  } = useQuery(
    "checkins",
    () =>
      fetch("/api/checkin?id=" + user.id).then(response => response.json()),
    { enabled: !!user && !!user.id }
  );

  if (user) {
    return (
      <div>
        <Nav />
        Welcome {user.name}!
        <Button onClick={() => router.push("/api/auth/logout")} text="Logout" />
        <p>
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
              <td>User Id</td>
              <td>{user.id}</td>
            </tr>
          </table>
          <hr />
          <h2>My Gym</h2>
          <h3 className="font-bold text-base mt-8">Checkin History</h3>
          <p>
            {isLoadingCheckins && "Loading history..."}
            {checkins && (
              <ul>
                {checkins.checkins.map(({ id, timestamp }) => (
                  <li key={id}>{id + " : " + timestamp}</li>
                ))}
              </ul>
            )}
            {checkinsError && "Error loading gym history."}
          </p>
        </p>
      </div>
    );
  }

  return <Button onClick={() => router.push("/api/auth/login")} text="Login" />;
}
