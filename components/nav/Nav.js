import Link from "next/link";

export default function Nav() {
  const links = [
    {
      title: "C",
      href: "/checkin",
    },
    {
      title: "W",
      href: "/workout",
    },
    {
      title: "C",
      href: "/club",
    },
    {
      title: "P",
      href: "/profile",
    },
  ];

  return (
    <div className="flex bg-blue-600 text-white">
      {links.map(({ title, href }, i) => (
        <div className="flex flex-1">
          <Link href={href} key={i}>
            <a className="flex flex-1 shadow m-4 p-4 text-left border rounded justify-center items-center transition-all hover:text-blue-600 hover:bg-white">
              <h2>{title}</h2>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
