import React from "react";
import Button from "../button";
import Nav from "../nav";
import { useUser } from "../auth";


export default function Layout({ children }) {
  const { login, user } = useUser();

  const [username, setUsername] = React.useState("");

  const signIn = () => {
    return (
      <div className="flex m-8 mt-52 justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={() => {
            login(username.toLowerCase());
            event.preventDefault();
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Only two gym bros here...
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button className="flex-1" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const layout = () => {
    return (
      <div className="flex flex-col md:flex-row md:flex-row-reverse w-screen h-screen bg-white">
        <main className="flex-1 flex flex-col p-4">{children}</main>
        <Nav />
      </div>
    )
  }

  return (
    <>
      {user === null
        ? signIn()
        : layout()
      }
    </>
  );
}
