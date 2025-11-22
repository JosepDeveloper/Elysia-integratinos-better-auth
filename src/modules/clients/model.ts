import * as z from "zod";

export namespace ClientModel {
  export const createClientResponse = z.object({
    message: z.literal("Client created successfully"),
    client: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  });
  export type CreateClientResponse = z.infer<typeof createClientResponse>;

  export const createClientBody = z.object({
    name: z.string(),
    email: z.email(),
  });
  export type CreateClientBody = z.infer<typeof createClientBody>;

  export const getClientsResponse = z.object({
    message: z.literal("Clients retrieved successfully"),
    clients: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
      }),
    ),
    total: z.number(),
  });
  export type GetClientsResponse = z.infer<typeof getClientsResponse>;

  export const isErrorInDB = z.literal("Error in database");
  export type IsErrorInDB = z.infer<typeof isErrorInDB>;

  export const clientIsInvalid = z.literal("The client is already registered");
  export type ClientIsInvalid = z.infer<typeof clientIsInvalid>;
}
