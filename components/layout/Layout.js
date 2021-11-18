import Image from "next/image";
import Link from "next/link";
import Nav from '../nav';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <div className="container mx-auto">
        <main className="flex flex-col flex-1 justify-center items-center min-h-screen">
          { children }
        </main>
      </div>
      <footer className="flex p-4 px-1 bg-green-600 border-t justify-center items-center">
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <a className="flex justify-center items-center flex-grow">
            Powered by{" "}
            <span className="h-4 ml-2">
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </Link>
      </footer>
    </div>
  );
}
