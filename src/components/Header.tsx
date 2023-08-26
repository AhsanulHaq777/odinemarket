'use client'
import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function Header() {
  var cartValue = useSelector(
    (state:RootState)=>state.cart.totalQuantity
);
  return (
    <div className='flex justify-around items-center mt-9 px-20 mb-20'> 
        <div>
          <a href='/'><Image alt='logo' height='175' width='155' src='/Logo.webp' /></a>
        </div>
        <div>
            <ul className='flex flex-row space-x-12 font-mono text-xl'>
              <li><Link href='/female'>Female</Link></li>
              <li><Link href='/male'>Male</Link></li>
              <li><Link href='/kids'>Kids</Link></li>
              <li><Link href='/products'>All Products</Link></li>
            </ul>
        </div>
        <div className='flex flex-row items-center w-96'>
          <Search/><Input type="text" className='h-[30px]' placeholder="What you looking for" />
        </div>
        <div>
          <Link href={'/cart'}>
            <Button variant="secondary" className='rounded-full h-[52px] w-[52px]'>
              <ShoppingCart className='flex-shrink-0 absolute h-7 w-7'/>
              <span className='relative flex items-center justify-center ml-3 shrink-0 mb-6 w-4 h-4  rounded-full   bg-red-500 text-xs font-bold text-center text-white'>{cartValue}</span>
            </Button>
          </Link></div>
    </div>
  )
}
