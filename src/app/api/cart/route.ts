import {db, cartTable} from "@/lib/drizzel"
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import {NextRequest, NextResponse} from "next/server"
import {v4 as uuid} from "uuid"

export async function GET(request: NextRequest){
    const res = request.nextUrl;
    const paramid = res.searchParams.get("user_id") as string;
    if(!paramid){
        return NextResponse.json({message: "No products added yet"})
    }
    else{
        try {
            const result = await db.select().from(cartTable).where(eq(cartTable.user_id,paramid));
            return NextResponse.json({data: result})
        } catch (error) {
            console.log((error as {message: string}).message)
            return NextResponse.json({message:"Something is fishy..."})
        }
    }
    
}

export async function POST(request: NextRequest){
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();
    const user_id = cookies().get("user_id")
     if(!user_id){
        setCookies.set("user_id",uid);
     }
    try {
        const findProduct = await db.select().from(cartTable).where(
            and(
                eq(cartTable.product_id, req.product_id),
                eq(cartTable.user_id, (user_id?.value as string))
                )
            );
        if (findProduct.length == 0) {
            const result = await db.insert(cartTable).values({
                user_id: cookies().get("user_id")?.value as string,
                product_id: req.product_id,
                quantity: 1
            }).returning();
            return NextResponse.json({result})
        }
        else{
            const result = await db.update(cartTable).set({
                quantity: 2
            }).where(
                and(
                    eq(cartTable.product_id, req.product_id),
                    eq(cartTable.user_id, (user_id?.value as string))
                    )
                ).returning();
            return NextResponse.json({result})
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "You got error"})
    }
}