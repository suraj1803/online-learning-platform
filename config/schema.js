import { boolean } from "drizzle-orm/gel-core";
import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar()
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull(),
  name: varchar(),
  description: varchar(),
  noOfChapters: integer(),
  includeVideo: boolean(),
  level: varchar(),
  courseJson: json(),
  category: varchar(),
  userEmail: varchar('userEmail').references(() => usersTable.email).notNull()
})
