"use client"
import { cartActions } from '@/slice/cartSlice'
import { useAppDispatch } from '@/store/store'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Trash2Icon } from 'lucide-react'
import imageUrlBuilder from '@sanity/image-url'
import {client} from '@/lib/sanityClient'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"


//create image url from sanity image
const builder = imageUrlBuilder(client);
function urlFor(source: File | SanityImageSource) {
  return builder.image(source);
}

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
    cartItem: ISanityProduct
  }

const CartItem = ({cartItem}: Props ) => {
    const [qty, setQty] = useState(cartItem.quantity);
    const dispatch = useAppDispatch();

    const handleCartProduct = async (newQuantity: number) => {
        const productNewPrice = cartItem.price * newQuantity;
        try
        {
            const res = await fetch("/api/cart",{
                method: "POST",
                body: JSON.stringify({
                    product_id: cartItem._id,
                    price: productNewPrice,
                    quantity: newQuantity,
                    
                })
            })
        }
        catch(error){
            console.log((error as {message: string}).message);
        }
    }

    const Increment = () => {
        handleCartProduct(qty + 1);
        setQty(qty + 1);
        dispatch(cartActions.addToCart({ product: cartItem, quantity: 1 }));
    }
    const Decrement = () => {
        if(cartItem.quantity > 1){
            handleCartProduct(qty - 1);
            setQty(qty - 1);
            dispatch(cartActions.removeFromCart(cartItem._id));
        }
    }
    
    const DeleteProduct = async () => {
        try {
            const rs = await fetch(`/api/cart?product_id=${cartItem._id}`,{method: "DELETE"})
        } catch (error) {
            console.log((error as {message: string}).message)
        }
    } 
    const Delete = () => {
        DeleteProduct();
        dispatch(cartActions.delteProduct(cartItem._id));
    }
  return (
    <div className="flex flex-col sm:flex-row gap-10 mb-16">
        <Image src={urlFor(cartItem.image).url()} width={200} height={200} alt={cartItem.title} className=' rounded-xl'/>
        <div className="flex flex-col justify-between items-start w-full">
            <div className="flex justify-between items-center w-80 sm:w-full flex-initial">
                <h2 className="text-gray-700 font-thin text-2xl font-mono">{cartItem.title}</h2>
                <Button className=' text-black hover:bg-white bg-white'>
                    <Trash2Icon className='h-7 w-7' onClick={Delete}/>
                </Button>
            </div>
            <p className="text-gray-500 text-xl font-bold font-mono mt-6">{cartItem.item}</p>
            <p className="text-black font-semibold text-xl tracking-tighter mt-4 font-mono">Delivery Estimation</p>
            <p className=" text-orange-300 font-semibold text-xl tracking-normal mt-4 font-mono">5 Working Days</p>
            <div className="flex justify-between items-center w-80 sm:w-full flex-initial">
                <div><p className=" text-black mt-4 font-extrabold tracking-wider font-mono text-[22px]">${cartItem.price * cartItem.quantity}</p></div>
                <div className='flex mt-10 items-center gap-x-8'>
                <h3 className=' font-semibold text-xl'>Quantity:</h3>
                <div className='flex items-center gap-x-3'>
                    {/* <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={()=>{setCount(count == 1 ? 1 : count - 1)}}> - </button> */}
                    <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={Decrement}> - </button>
                    {/* <span className='text-lg'>{counterValue == 0 ? 1 : counterValue}</span> */}
                    <span className='text-lg'>{qty}</span>
                    {/* <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={()=>{setCount(count + 1)}}> + </button> */}
                    <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={Increment}> + </button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem