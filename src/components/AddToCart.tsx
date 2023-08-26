"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import {useDispatch} from 'react-redux'
import {cartActions} from '@/slice/cartSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import toast from 'react-hot-toast';

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
  interface IProduct{
  items: ISanityProduct,
  qty: number
  }

const AddToCart = (props:IProduct) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
    var counterValue = useSelector((state:RootState)=>state.cart.totalQuantity)
    const increment = ()=>{
      // dispatch(cartActions.addToCart({quantity: 1}))
      setQty(qty+1);
    }
    const decrement = ()=>{
      // dispatch(cartActions.removeFromCart({quantity: 1}))
      if (qty > 1) {
        setQty(qty - 1);
      }
    }
    const handleAddToCart =async () => {
              const res = await fetch("/api/cart",{
                  method: "POST",
                  body: JSON.stringify({
                      product_id: props.items._id,
                      price: props.items.price,
                      quantity: qty,
                      
                  })
              })
              const result = await res.json();
          }
  const addItem = ()=>{
        dispatch(cartActions.addToCart({product: props.items, quantity: qty}))
        toast.success("Product Added")
        handleAddToCart()
       }
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex mt-10 items-center gap-x-8'>
          <h3 className=' font-semibold text-xl'>Quantity:</h3>
          <div className='flex items-center gap-x-3'>
            {/* <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={()=>{setCount(count == 1 ? 1 : count - 1)}}> - </button> */}
            <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={decrement}> - </button>
            {/* <span className='text-lg'>{counterValue == 0 ? 1 : counterValue}</span> */}
            <span className='text-lg'>{qty}</span>
            {/* <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={()=>{setCount(count + 1)}}> + </button> */}
            <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={increment}> + </button>
          </div>
        </div>
        <div className='mt-10 w-auto'>
          <Button onClick={addItem} className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none flex px-4 py-2 text-white font-mono text-lg font-semibold gap-3">
            <ShoppingCart/>Add to Cart
          </Button>
        </div>
      </div>
      
    </>
  )
}

export default AddToCart




























// "use client"
// import { Button } from './ui/button'
// import {useRouter} from "next/navigation"
// import { ShoppingCart } from 'lucide-react'
// import {useDispatch} from 'react-redux'
// import {cartActions} from '@/slice/cartSlice'
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
// import { useState } from "react";

// interface ISanityProduct {
//   _id: string,
//   title: string,
//   description: string,
//   price: number,
//   image: File, // I should take this as type Image imported from sanity
//   item: string,
//   category: {
//     title: string
//   }
// }
// interface IProduct{
//   product: ISanityProduct,
//   quantity: number,
// }
// interface IProd{
// items: IProduct,
// qty: number
// }

// export default function AddToCart(props: IProd){
// //o   var cartValue = useSelector(
// //o     (state:RootState)=>state.cart.totalQuantity
// //o );

//   const dispatch = useDispatch();
//   const [qty, setQty] = useState(1);
//   const decreaseQty = () => {
//     if (qty > 1) {
//       setQty(qty - 1);
//     }
//   };
//   const addItem = ()=>{
//     dispatch(cartActions.addToCart({prod: props.items, quantity: qty}))
//     toast.success("Product Added")
//     handleAddToCart()
//   }
//   const router = useRouter();
//     const handleAddToCart =async () => {
//         const res = await fetch("/api/cart",{
//             method: "POST",
//             body: JSON.stringify({
//                 product_id: props.items._id,
//                 price: props.items.price,
//                 quantity: qty,
                
//             })
//         })
//         router.refresh();
//         const result = await res.json();
//     }
//     return(
//       <Button onClick={addItem} className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none flex px-4 py-2 text-white font-mono text-lg font-semibold gap-3">
//        <ShoppingCart/>Add to Cart
//       </Button>
                
//     )
//   }