import React from 'react'
import { cookies } from "next/headers";
import { CARTTABLE } from '@/lib/drizzel';
import {client} from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import Image from "next/image"
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"


interface IProduct {
    title: string,
    image: File, // I should take this as type Image imported from sanity
    item: string,
    category: {
      title: string
    }
  }

  //get product data based on current user from postgress database
const showCart =async () => {
    const user_id = cookies().get("user_id")?.value;
    try {
        const res = await fetch(`http://localhost:3000/api/cart?user_id=${user_id}`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log((error as {message: string}).message)
    }
}

// Get products details sanity
const getProductDetail = async(id: string)=>{
    const response: IProduct[] = await client.fetch(groq`*[_type=='product' && _id == $id]{title,image,item,category -> {title}}`,{id});
    return response;
}

// create image url from sanity image
const builder = imageUrlBuilder(client);
function urlFor(source: File | SanityImageSource) {
  return builder.image(source);
}


export default async function page() {
    
    const cartData: {data: CARTTABLE[]} = await showCart();
     var finalProduct: IProduct[] = [];
     var element;
    for (let index = 0; index < cartData.data.length; index++) {
         element = cartData.data[index].product_id;
         finalProduct.push(...await getProductDetail(element));
    }
  return (
    <div>
        {
            cartData ? 
            <>
                {
                    finalProduct.map((prod)=>(
                        <div key={prod.title}>
                            <Image src={urlFor(prod.image).url()} width='220' height='220' alt={prod.title} className=' rounded-xl'/>
                            <h2>{prod.item}</h2>
                            <h2>{prod.title}</h2>
                            <h2>{prod.category.title}</h2>
                        </div>
                    ))
                }
                <h2>Your cart data.</h2>
                {
                    cartData.data.map( async (item)=>(
                    <>
                        <div key={item.id}>{item.quantity}</div>
                    </> 
                    ))
                }
            </> : <h2>Your cart is emplty.</h2>
        }
    </div>
  )
}
