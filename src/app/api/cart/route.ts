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
            req.price = req.price * req.quantity;
            console.log("price total type: " +  typeof req.price)
            console.log("price total : " +  req.price)
            const result = await db.insert(cartTable).values({
                user_id: cookies().get("user_id")?.value as string,
                product_id: req.product_id,
                quantity: req.quantity,
                price: req.price
            }).returning();
            return NextResponse.json({result})
        }
        else{
            req.quantity += req.quantity;
            req.price = req.price * req.quantity;
            req.price = req.price += req.price;
            const result = await db.update(cartTable).set({
                quantity: req.quantity,
                price: req.price
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

export async function DELETE(request: NextRequest) {
    const req = request.nextUrl;
    const userIDParam = req.searchParams.get("user_id") as string;
    const productIDParam = req.searchParams.get("product_id") as string;
    if (!userIDParam && !productIDParam) {
        return NextResponse.json({message: "No product to delete"});
    }
    else{
        try {
            const result = await db.delete(cartTable).where(
                and(
                    eq(cartTable.user_id,userIDParam),
                    eq(cartTable.product_id,productIDParam)
                )
            ).returning();
            return NextResponse.json({result});
        } catch (error) {
            console.log((error as {message: string}).message);
            return NextResponse.json({message:"Something is not ok..."});
        }
    }
    
}