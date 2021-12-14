import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Button from "../../components/button";
import Nav from "../../components/nav";

export default function Profile() {
  const router = useRouter();
  const { user, error: userError, isLoading: isLoadingUser } = useUser();

  const {
    data: checkins,
    error: checkinsError,
    isLoading: isLoadingCheckins
  } = useQuery(
    "checkins",
    () =>
      fetch("/api/checkin?id=" + user.sub).then(response => response.json()),
    { enabled: !!user && !!user.sub }
  );

  if (isLoadingUser) return <div>Loading user profile...</div>;

  if (userError) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <Nav />
        Welcome {user.name}!
        <Button onClick={() => router.push("/api/auth/logout")} text="Logout" />
        <p>
          <Image
            alt={user.name}
            src={user.picture}
            width={75}
            height={75}
            className="rounded-full"
          />
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
