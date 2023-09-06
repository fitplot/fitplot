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
    } catch (error) {
      console.error(error, `API_HOST=${process.env.API_HOST}`);
      return {
        notFound: true,
      };
    }
  };
}

async function getUser({ req }) {
  const user = await fetch(`${process.env.API_HOST}/api/me`, {
    headers: {
      Cookie: req.headers.cookie,
    },
  }).then((response) => (response.ok ? response.json() : null));

  return user;
}
