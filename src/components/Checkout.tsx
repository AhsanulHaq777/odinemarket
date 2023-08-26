'use client'
import getStripePromise from "@/lib/stripe";
import { Button } from "./ui/button";

// const products =[
//   {
//     product: 1,
//     price: 400,
//     name: "shirt",
//     quantity: 3,
//   },
//   {
//     product: 2,
//     price: 4000,
//     name: "T-shirt",
//     quantity: 2,
//   },
//   {
//     product: 3,
//     price: 1000,
//     name: "vest",
//     quantity: 10,
//   },
//   {
//     product: 4,
//     price: 700,
//     name: "cap",
//     quantity: 1,
//   },

// ];
interface ISanityProduct {
  _id: string,
  title: string,
  description: string,
  price: number,
  image: File, // I should take this as type Image imported from sanity
  item: string,
  quantity: number,
  category: {
    title: string
  }
}
interface Props{
  cartProducts: ISanityProduct[]
}

export default function Checkout(prods: Props ) {
  const handleCheckOut = async () => {
    const stripe = await getStripePromise();
    const res = await fetch('/api/stripe-session/',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      cache: "no-cache",
      body: JSON.stringify(prods.cartProducts)
    })
    const data = await res.json();
    if(data.session){
      console.log(data.session)
      stripe?.redirectToCheckout({sessionId: data.session.id})
    }
  }
  return (
    <div className=''>
        {/* <button onClick={handleCheckOut} className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none px-16 flex py-2 text-white font-mono text-lg font-semibold gap-3">Process to Checkout</button> */}
        <Button onClick={handleCheckOut} className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none w-full flex py-2 text-white font-mono text-lg font-semibold gap-3">
            Process to Checkout
        </Button>
    </div>
  )
}
