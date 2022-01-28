import Nav from "../nav";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-row-reverse w-screen h-screen bg-white">
        <main className="flex-1 flex flex-col p-4">{children}</main>
        <Nav />
      </div>
    </>
  );
}
