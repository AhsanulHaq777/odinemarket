"use client"
import { Button } from './ui/button'
import {useRouter} from "next/navigation"
import { ShoppingCart } from 'lucide-react'

interface IProduct {
    _id: string,
    title: string,
    description: string,
    price: number,
    image: File, 
    item: string,
    category: {
      title: string
    }
  }

export default function AddToCart({items}: {items : IProduct}){
  const router = useRouter();
    const handleAddToCart =async () => {
        const res = await fetch("/api/cart",{
            method: "POST",
            body: JSON.stringify({
                product_id: items._id,
                price: items.price
            })
        })
        router.refresh();
        const result = await res.json();
    }
    return(
      <Button onClick={handleAddToCart} className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none flex px-4 py-2 text-white font-mono text-lg font-semibold gap-3">
       <ShoppingCart/>Add to Cart
      </Button>
                
    )
  }