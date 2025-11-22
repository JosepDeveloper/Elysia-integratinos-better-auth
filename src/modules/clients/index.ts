import { Elysia } from "elysia";
import { Client } from "./service";
import { ClientModel } from "./model";

export const clients = new Elysia({ prefix: "/clients" })
  .get(
    "/",
    async () => {
      const response = await Client.getClients();

      return response;
    },
    {
      response: {
        200: ClientModel.getClientsResponse,
        500: ClientModel.isErrorInDB,
      },
      detail: {
        summary: "Get all clients",
        description: "Retrieve a list of all clients",
        response: {},
      },
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const response = await Client.createClient(body);

      return response;
    },
    {
      body: ClientModel.createClientBody,
      response: {
        201: ClientModel.createClientResponse,
        409: ClientModel.clientIsInvalid,
        500: ClientModel.isErrorInDB,
      },
      detail: {
        summary: "Create a new client",
        description: "Create a new client with the provided information",
      },
    },
  );
