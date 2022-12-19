import { createAuth0 } from "@auth0/auth0-vue";

export default ({ app }) => {
  const auth0 = createAuth0({
    domain: "dev-bln08vx7qwo4ws2k.us.auth0.com",
    client_id: "r7sEv6zNQiCrkMDG6C5fvodfzWtMWrXt",
    audience: "https://dev-bln08vx7qwo4ws2k.us.auth0.com/api/v2/",
    redirect_uri: window.location.origin,
  });
  app.use(auth0);
};
