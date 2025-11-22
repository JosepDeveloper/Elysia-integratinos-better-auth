import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const client = sqliteTable("client", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).notNull().unique(),
});

export const table = {
  client,
};

export type Table = typeof table;
