import {
  CreditCardIcon,
  PlayIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  const links = [
    {
      title: "Workout",
      href: "/workout",
      Icon: PlayIcon,
    },
    {
      title: "Checkin",
      href: "/checkin",
      Icon: CreditCardIcon,
    },
    {
      title: "Wellness",
      href: "/club",
      Icon: PlusIcon,
    },
    {
      title: "Profile",
      href: "/profile",
      Icon: UserCircleIcon,
    },
  ];

  return (
    <ul
      className="flex md:flex-col md:p-2 bg-slate-900 text-white text-xs"
      role="tree"
    >
      {links.map(({ title, href, Icon }) => (
        <div className="flex flex-1 md:flex-initial" key={title}>
          {/* NOTE: `h-12` below must be perfectly offset by a bottom margin of the Layout component */}
          <button
            className="flex flex-col flex-1 md:rounded-full justify-center items-center h-12 hover:bg-slate-800"
            onClick={() => router.push(href)}
          >
            {Icon && <Icon className="h-5 w-5 md:w-12 md:h-12" />}
            <span className="md:sr-only">{title}</span>
          </button>
        </div>
      ))}
    </ul>
  );
}
