import Nav from "../nav";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <div className="container mx-auto">
        <main className="flex flex-col flex-1 justify-center items-center min-h-screen">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
