import React from "react";
import Nav from "../nav";
import { useUser } from "../auth";

export default function Layout({ children }) {
  const { login } = useUser();

  React.useEffect(() => {
    login("justin");
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-row-reverse w-screen h-screen bg-white">
        <main className="flex-1 flex flex-col p-4">{children}</main>
        <Nav />
      </div>
    </>
  );
}
