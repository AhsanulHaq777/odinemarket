import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key,{apiVersion: "2022-11-15"})

export async function POST(request: NextRequest){
    const body = await request.json();
    // console.log(body)
    try {
        if(body.length > 0){
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                // line_items: [
                //   {
                //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                //     price: '{{PRICE_ID}}',
                //     quantity: 1,
                //   },
                // ],
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [{shipping_rate: "shr_1NbtkLLTi0hn3a2jCQi0FM0Y"},{shipping_rate: "shr_1NbtikLTi0hn3a2jJzOHqCDr"}],
                line_items: body.map((item:any)=>{
                    return{
                        price_data:{
                            currency: 'pkr',
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: item.price * 100,
                        },
                        
                        quantity: item.quantity,
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: 10,
                          },
                    }
                }),
                phone_number_collection: {enabled: true},
                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
              });
              //return NextResponse.redirect(session.url as string);
              return NextResponse.json({session})
        }
        else{
            return NextResponse.json({message: "No Data Found"});
        }
      } catch (err: any) {
        console.log(err)
        return NextResponse.json(err.message);
      }
}