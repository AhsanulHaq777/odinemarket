"use client"
import React from 'react'
import {useRouter} from "next/navigation"
import { Trash2Icon } from 'lucide-react'
import { cookies } from 'next/headers'
import { CARTTABLE } from '@/lib/drizzel'
import { Button } from './ui/button'


export default function DeleteFromCart({items}: {items : CARTTABLE}) { 
    const router = useRouter();
        async function DeleteProduct(userID: string,productID: string){
            try {
                const rs = await fetch(`/api/cart?user_id=${userID}&&product_id=${productID}`,{method: "DELETE"})
                router.refresh();
            } catch (error) {
                console.log((error as {message: string}).message)
            }
        } 
  return (
    <div className=' mb-40'>
        <Button className=' text-black hover:bg-white bg-white'>
            <Trash2Icon className='h-7 w-7' onClick={() => DeleteProduct(items.user_id,items.product_id)}/>
        </Button>
    </div>
  )
}
