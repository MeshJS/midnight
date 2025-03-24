// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  timestamp,
  varchar,
  text,
  pgTable, 
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `${name}`);

export const auctionStatusEnum = pgEnum("auction_status", ["Closed", "Live"]);

export const auctions = pgTable(
  "auctions",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    title: varchar("title", { length: 256 }),
    description: text("description").notNull(),
    estimate: text("estimate").notNull(),
    highestBid: integer("highest_bid").notNull(),
    deadline: timestamp("deadline", { withTimezone: true }).notNull(),
    auctionStatus: auctionStatusEnum("auction_status")
      .notNull()
      .default("Live"),
    imageUrl: text("imageurl").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("title_idx").on(example.title),
  }),
);

export const auctionsSmartContracts = pgTable(
  "auctions-smartContracts",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),    
    smartContract: text("smartContract").notNull(),    
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("smartContract_idx").on(example.smartContract),
  }),
);
