import {db, cartTable} from "@/lib/drizzel"
import { cookies } from "next/headers";
import {NextRequest, NextResponse} from "next/server"
import {v4 as uuid} from "uuid"

export async function GET(request: NextRequest){
    try {
        const result = await db.select().from(cartTable);
        return NextResponse.json({result})
    } catch (error) {
        return NextResponse.json({message:"Something is fishy..."})
    }
}

export async function POST(request: NextRequest){
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();
    const user_id = cookies().get("user_id")
    // console.log(user_id)
     if(!user_id){
        setCookies.set("user_id",uid);
     }
    try {
        const result = await db.insert(cartTable).values({
            product_id: req.product_id,
            quantity: 1,
            user_id: cookies().get("user_id")?.value as string
        }).returning();
        return NextResponse.json({result})
    } catch (error) {
        return NextResponse.json({message: "You got error"})
    }
}