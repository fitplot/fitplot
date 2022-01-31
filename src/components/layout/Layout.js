import React from "react";
import Button from "../button";
import Nav from "../nav";
import { useUser } from "../auth";
import { Input, Label } from "../forms";

export default function Layout({ children }) {
  const { login, user } = useUser();

  const signIn = () => {
    return (
      <div className="flex m-8 mt-52 justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(event) => {
            const form = event.currentTarget;
            const rawInput = form.username.value;
            const username = rawInput.trim().toLowerCase();
            login(username);
            event.preventDefault();
          }}
        >
          <div className="mb-4">
            <div>
            <div className="flex flex-wrap items-baseline justify-between">
              <Label
                htmlFor="username"
              >
                Only two gym bros here...
              </Label>
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
          </div>
          <div className="flex">
            <Button className="flex-1" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-row-reverse w-screen h-screen bg-white break-words overflow-hidden">
      <main className="flex-1 flex flex-col p-4">
        {user ? children : signIn()}
      </main>
      <Nav />
    </div>
  );
}
