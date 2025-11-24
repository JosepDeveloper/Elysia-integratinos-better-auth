import { Elysia } from "elysia";
import { clients } from "./modules/clients";
import { logger } from "@bogeychan/elysia-logger";
import { auth } from "./utils/auth";
import cors from "@elysiajs/cors";

const isDevelopment = process.env.NODE_ENV === "development";

const app = new Elysia()
  .mount(auth.handler)
  .use(
    logger({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    }),
  )
  .use(clients)
  .get("/", () => {
    return {
      message: "This api for learning Elysia",
    };
  })
  .listen(3000);

if (isDevelopment) {
  app.use(
    cors({
      origin: "localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
