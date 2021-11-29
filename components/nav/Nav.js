import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import logger from '../../lib/logger';

export default function Nav() {
  const router = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => fetch("/api/checkin?id=" + user.sub, { method: "POST" }),
    {
      onSuccess: response => {
        response.status === 200
          ? router.push("/profile")
          : logger.info(response.status)
        queryClient.invalidateQueries("checkins");
      }
    }
  );

  const links = [
    {
      title: "Checkin",
      href: "/profile"
    },
    {
      title: "Workout",
      href: "/workout"
    },
    {
      title: "Wellness",
      href: "/club"
    },
    {
      title: "Profile",
      href: "/profile"
    }
  ];

  async function validateRoute(title, href) {
    title === "Checkin" ? mutation.mutate(href) : router.push(href);
  }

  return (
    <div className="flex bg-blue-600 text-white">
      {links.map(({ title, href }, i) => (
        <div className="flex flex-1" key={i}>
          <button
            className="flex flex-1 shadow m-4 p-4 text-left border rounded justify-center items-center transition-all hover:text-blue-600 hover:bg-white"
            onClick={() => {
              validateRoute(title, href);
            }}
          >
            {title}
          </button>
        </div>
      ))}
    </div>
  );
}
