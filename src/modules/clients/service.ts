import { status } from "elysia";
import { db } from "../../database";
import { client } from "../../database/schema";
import { ClientModel } from "./model";
import { eq } from "drizzle-orm";

export abstract class Client {
  static async getClients(): Promise<ClientModel.GetClientsResponse> {
    try {
      const data = await db.select().from(client);

      return {
        message: "Clients retrieved successfully",
        clients: data,
        total: data.length,
      };
    } catch (error) {
      throw status(500, "Error in database" satisfies ClientModel.IsErrorInDB);
    }
  }

  static async createClient({
    name,
    email,
  }: ClientModel.CreateClientBody): Promise<ClientModel.CreateClientResponse> {
    try {
      const [userIsExist] = await db
        .select()
        .from(client)
        .where(eq(client.email, email));

      if (userIsExist) {
        throw status(
          409,
          "The client is already registered" satisfies ClientModel.ClientIsInvalid,
        );
      }

      const data = await db.insert(client).values({ name, email }).returning();

      return {
        message: "Client created successfully",
        client: data[0],
      };
    } catch (error) {
      // @ts-ignore
      const code = error.code;

      if (code === 409) {
        throw status(
          409,
          "The client is already registered" satisfies ClientModel.ClientIsInvalid,
        );
      }

      throw status(500, "Error in database" satisfies ClientModel.IsErrorInDB);
    }
  }
}
