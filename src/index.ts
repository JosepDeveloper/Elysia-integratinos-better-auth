import { Elysia } from "elysia";
import { clients } from "./modules/clients";
import { logger } from "@bogeychan/elysia-logger";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        components: {
          schemas: {
            Client: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
              },
            },
          },
        },
      },
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
