import React from "react";
import Home from "../components/home";
import Button from "../components/button";
import { useUser } from "../components/auth";

export default function Index() {
  const { login, user } = useUser();

  const [username, setUsername] = React.useState("");

  const signIn = () => {
    return (
      <div className="flex m-8 mt-52 justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={() => {
            login(username);
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

  return user === null ? signIn() : <Home />;
}
