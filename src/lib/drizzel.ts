import {pgTable, serial, varchar, integer, numeric} from "drizzle-orm/pg-core"
import {drizzle} from "drizzle-orm/vercel-postgres"
import {sql} from "@vercel/postgres"
import {InferModel} from "drizzle-orm"


export const cartTable = pgTable('cart',{
    id: serial('id').primaryKey(),
    user_id: varchar('user_id', {length: 255}).notNull(),
    product_id: varchar('product_id', {length: 255}).notNull(),
    quantity: integer('quantity').notNull(),
    price: numeric('price').notNull()
})

export const db = drizzle(sql);
export type CARTTABLE = InferModel<typeof cartTable>