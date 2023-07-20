import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input"
import {CiSearch} from "react-icons/ci"
import {FiShoppingCart} from "react-icons/fi"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex justify-around items-center mt-9 px-20 mb-20'> 
    {/* mb-12  */}
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
          <CiSearch/><Input type="text" className='h-[30px]' placeholder="What you looking for" />
        </div>
        <div><Button variant="secondary" className=' rounded-full font-bold text-xl'><FiShoppingCart/></Button></div>
    </div>
  )
}
