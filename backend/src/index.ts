import { Elysia } from "elysia";
import { clients } from "./modules/clients";
import { logger } from "@bogeychan/elysia-logger";
import { auth } from "./utils/auth";
import cors from "@elysiajs/cors";

const isDevelopment = process.env.NODE_ENV === "development";

const app = new Elysia()
  .use(
    cors({
      origin: isDevelopment ? "http://localhost:5173" : "",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  )
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
  .mount(auth.handler)
  .use(clients)
  .get("/", () => {
    return {
      message: "This api for learning Elysia",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
