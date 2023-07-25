import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {client} from '@/lib/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(client)
function urlFor(source: File | SanityImageSource) {
  return builder.image(source)
}
// to fetch data from sanity
const getProducts = async()=>{
  const response = await client.fetch(`*[_type=='product']{_id,title,description,price,image,item,category -> {title}}`);
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

export default async function page() {
  const productsData:IProduct[] = await getProducts();
  return (
    <div className=" flex flex-row flex-wrap gap-[85px] mt-20 mb-36">
          {productsData.length > 0 ? 
          (productsData.map((item)=>(
            <Link href={`/products/${item.title}`}  key={item._id}>
             <div>
                <Image src={urlFor(item.image).url()} width='280' height='280' alt={item.title} />
                  {/* <Image src='https://cdn.sanity.io/images/czlfkjkf/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png?w=700' width='600' height='600' alt="products" /> */}
                  <h2 className="text-gray-700 text-xl font-extrabold font-mono mt-3">{item.title}</h2>
                  <p className="text-gray-400 text-xl font-bold font-mono mt-1">{item.item}</p>
                  <p className=" text-gray-700 mt-2 font-extrabold font-mono text-2xl">${item.price}</p>
             </div>
            </Link>
            ))
          ) : <p>No Products Found</p>
        }
    </div>
  )
}
