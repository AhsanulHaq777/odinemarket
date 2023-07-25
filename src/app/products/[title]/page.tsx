import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {client} from '@/lib/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { groq } from 'next-sanity'

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
    <div className=" flex flex-row gap-[85px] mt-20 mb-36">
          {productData.map((item)=>(
            <Link href={`/products/${item.title}`} key={item._id}>
             <div>
                <Image src={urlFor(item.image).url()} width='280' height='280' alt={item.title}/>
                  <h2 className="text-gray-700 text-xl font-extrabold font-mono mt-3">{item.title}</h2>
                  <p className="text-gray-400 text-xl font-bold font-mono mt-1">{item.item}</p>
                  <p className=" text-gray-700 mt-2 font-extrabold font-mono text-2xl">${item.price}</p>
             </div>
            </Link>
            ))
}
    </div>
  )
}
