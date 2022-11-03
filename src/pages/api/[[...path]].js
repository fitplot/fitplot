import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: process.env.SERVICE_URL,
  autoRewrite: false,
  changeOrigin: true, // Might need?
});

export const config = {
  /* See @link https://nextjs.org/docs/api-routes/edge-api-routes */
  runtime: 'experimental-edge',
}

export default function handler(req, res) {
  return new Promise((resolve, reject) => {

    // don't forwards the cookies
    // TODO: handle cookies, as needed
    req.headers.cookie = "";

    // TODO: handle auth, as needed

    /**
     * If an error occurs in the proxy, reject the promise
     * to prevent a stalled request.
     */
    proxy.once("error", reject);

    proxy.web(req, res);
  });
}
