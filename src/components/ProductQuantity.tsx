"use client"
import React, {useState, useEffect} from 'react'

export default function ProductQuantity() {
    const [count,setCount] = useState(1)
    
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
        <button className='flext text-lg w-9 h-9 rounded-full border bg-slate-100 items-center justify-center' onClick={()=>{setCount(count == 1 ? 1 : count - 1)}}> - </button>
        <span className='text-lg'>{count}</span>
        <button className='flext text-lg w-9 h-9 rounded-full border border-black items-center justify-center' onClick={()=>{setCount(count + 1)}}> + </button>
    </div>
  )
}
