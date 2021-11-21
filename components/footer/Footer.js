import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex p-4 px-1 bg-blue-600 text-white border-t justify-center items-center">
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
  );
}
