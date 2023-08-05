import React from 'react'
import { cookies } from "next/headers";
import { CARTTABLE } from '@/lib/drizzel';
import {client} from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import Image from "next/image"
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import DeleteFromCart from '@/components/DeleteFromCart';
import ProductQuantity from '@/components/ProductQuantity';
import { Button } from '@/components/ui/button';


interface IProduct {
    title: string,
    image: File, // I should take this as type Image imported from sanity
    item: string,
    price: number,
    category: {
      title: string
    }
  }

  //get product data based on current user from postgress database
const showCart =async () => {
    const user_id = cookies().get("user_id")?.value;
    // try {
        
        const res = await fetch(`http://localhost:3000/api/cart?user_id=${user_id}`,{method: "GET"});
        console.log(res.status);
        const result = await res.json();
        if(res.ok){
            return result;
        }else{
            throw new Error('Something went wrong');
        }
        
    // } catch (error) {
    //     console.log("error from cart page " + error)
    // }
    
}

// Get products details sanity
const getProductDetail = async(id: string)=>{
    const response: IProduct[] = await client.fetch(groq`*[_type=='product' && _id == $id]{title,image,item,price,category -> {title}}`,{id});
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
    <div className=' px-12 mb-28'>
        <h1 className=' font-bold mt-28 mb-10 text-[30px]'>Shopping Cart</h1>
        {
            cartData.data.length > 0 ? 
            <>
                
                <div className='flex gap-32'>
                    <div className='gap-60 flex'>
                        <div>
                            {
                                finalProduct.map((prod)=>(
                                    <div key={prod.title} className='flex flex-row gap-10 mb-16'>
                                        <Image src={urlFor(prod.image).url()} width='205' height='150' alt={prod.title} className=' rounded-xl'/>
                                        <div>
                                            <h2 className="text-gray-700 font-thin text-2xl font-mono">{prod.title}</h2>
                                            <p className="text-gray-500 text-xl font-bold font-mono mt-6">{prod.item}</p>
                                            <h2 className="text-black font-semibold text-xl tracking-tighter mt-4 font-mono">Delivery Estimation</h2>
                                            <h2 className=" text-orange-300 font-semibold text-xl tracking-normal mt-4 font-mono">5 Working Days</h2>
                                            <p className=" text-black mt-4 font-extrabold tracking-wider font-mono text-[22px]">${prod.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div >
                            {
                                cartData.data.map( async (item)=>(
                                    <div key={item.id} className=' pb-[60px]'>
                                        <DeleteFromCart items={item}/>
                                        <div className=' pl-[-140px]'><ProductQuantity/></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className=' bg-slate-50 w-[350px] p-8'>
                        <h2 className=' font-extrabold text-xl'>Order Summary</h2>
                        <div className='flex justify-between items-center mt-8'>
                            <p className=" text-slate-800 font-light text-xl tracking-tighter  font-mono">Quantity</p>
                            <p className=" text-slate-800 font-light text-xl tracking-tighter  font-mono">1 Product</p>
                        </div>
                        <div className='flex justify-between items-center mt-8'>
                            <p className=" text-slate-800 font-light text-xl tracking-tighter font-mono">Sub Total</p>
                            <p className=" text-slate-800 font-light text-xl tracking-tighter font-mono">$ 175</p>
                        </div>
                        <div className=' flex items-center justify-center mt-8'>
                            <Button className=" bg-black hover:bg-black tracking-tighter justify-center items-center rounded-none w-full flex py-2 text-white font-mono text-lg font-semibold gap-3">
                                Process to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </> : <h2>Your cart is emplty.</h2>
        }
    </div>
  )
}
