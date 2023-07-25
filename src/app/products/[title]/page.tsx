import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import {client} from '@/lib/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { groq } from 'next-sanity'
import { ShoppingCart } from 'lucide-react'

const builder = imageUrlBuilder(client)
function urlFor(source: File | SanityImageSource) {
  return builder.image(source)
}
// to fetch data from sanity
const getProductDetail = async(productTitle: string)=>{
  const response = await client.fetch(groq`*[_type=='product' && title == $productTitle]{_id,title,description,price,image,item,category -> {title}}`,{productTitle});
  return response;
}

// make types for the data fetched from sanity
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


export default async function page({params}: { params : { title : string } }) {
  const newParam = params.title.replace(/%20/gi, " "); 
  const productData: IProduct[] = await getProductDetail(newParam);
  return (
    <>
    <div className=" mt-28 mb-36">
          {productData.map((item)=>(
            <div className='flex flex-row gap-10'>
              <div><Image src={urlFor(item.image).url()} width='100' height='100' alt={item.title}/></div>
              <div className='flex flex-row gap-10'>
                <Image src={urlFor(item.image).url()} width='750' height='750' alt={item.title}/>
                <div className='mt-12'>
                  <h2 className="text-gray-700 text-3xl font-mono mt-3">{item.title}</h2>
                  <p className="text-gray-400 text-2xl font-bold font-mono mt-1">{item.item}</p>
                  <div className='flex flex-row mt-5 gap-5 items-center'>
                    <button className=" bg-black tracking-tighter justify-center items-center flex px-4 py-2 text-white font-mono text-lg font-semibold gap-3">
                      <ShoppingCart/>Add to Cart
                    </button>
                    <p className=" text-gray-700 mt-2 font-extrabold font-mono text-3xl">${item.price}.00</p>
                  </div>
                </div>
              </div>
            </div>
            
            ))
          }
    </div>
    
    </>
    
  )
}
