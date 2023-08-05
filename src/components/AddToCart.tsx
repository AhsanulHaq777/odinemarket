"use client"
import { Button } from './ui/button'
import {useRouter} from "next/navigation"
import { ShoppingCart } from 'lucide-react'
import {useDispatch} from 'react-redux'
import {cartActions} from '@/slice/cartSlice'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

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
  var cartValue = useSelector(
    (state:RootState)=>state.cart.totalQuantity
);
  const dispatch = useDispatch();
  const addItem = ()=>{
    dispatch(cartActions.addToCart({quantity: 1}))
    toast.success("Product Added")
    handleAddToCart()
  }
  const router = useRouter();
    const handleAddToCart =async () => {
        const res = await fetch("/api/cart",{
            method: "POST",
            body: JSON.stringify({
                product_id: items._id,
                price: items.price,
                quantity: cartValue == 0? 1: cartValue
            })
        })
        router.refresh();
        const result = await res.json();
    }
    return(
      <Button onClick={addItem} className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none flex px-4 py-2 text-white font-mono text-lg font-semibold gap-3">
       <ShoppingCart/>Add to Cart
      </Button>
                
    )
  }