export default async function withUser({ req }) {
  try {
    const user = await fetch(`${process.env.SERVICE_URL}/api/me`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    }).then((response) => (response.ok ? response.json() : null));

    if (!user) {
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
}
