export default function withUser({ required = true } = {}) {
  return async function getServerSideProps({ req }) {
    try {
      const user = await getUser({ req });

      if (required && !user) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false,
          },
        };
      }

      return {
        props: { user },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  };
}

async function getUser({ req }) {
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    headers: {
      Cookie: req.headers.cookie,
    },
  }).then((response) => (response.ok ? response.json() : null));

  return user;
}
