import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  basePath: "http://localhost:3000",
});
