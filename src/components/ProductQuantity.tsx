"use client"
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {cartActions} from '@/slice/cartSlice'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function ProductQuantity() {
const dispatch = useDispatch();
    var counterValue = useSelector((state:RootState)=>state.cart.totalQuantity)
    const increment = ()=>{
      dispatch(cartActions.addToCart({quantity: 1}))
    }
    const decrement = ()=>{
      dispatch(cartActions.removeFromCart({quantity: 1}))
    }


    // const [count,setCount] = useState(1)


    
    // useEffect(() => {
    //   const countString = window.localStorage.getItem('count') as string;
    //     const countNumber = parseInt(countString, 10);
    //       setCount(countNumber);
    // }, []);

    // useEffect(()=>{
    //   window.localStorage.setItem('count',`${count}`);
    // },[count])
  return (
    <div className='flex items-center gap-x-3'>
        {/* <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={()=>{setCount(count == 1 ? 1 : count - 1)}}> - </button> */}
        <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={decrement}> - </button>
        <span className='text-lg'>{counterValue == 0 ? 1 : counterValue}</span>
        {/* <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={()=>{setCount(count + 1)}}> + </button> */}
        <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={increment}> + </button>
    </div>
  )
}
