import React from "react";
import Nav from "../nav";
import { useUser } from "../auth";
import Login from "../login";


export default function Layout({ children }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row md:flex-row-reverse w-screen h-screen bg-white break-words overflow-hidden">
      <main className="flex-1 flex flex-col p-4 overflow-auto">
        {user ? children : <Login />}
      </main>
      <Nav />
    </div>
  );
}
