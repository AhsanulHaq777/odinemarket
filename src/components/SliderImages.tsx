"use client"
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {client} from '@/lib/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
import 'swiper/css/bundle';
import 'swiper/css';

// to build a url of an image data fetched from sanity
const builder = imageUrlBuilder(client)
function urlFor(source: File | SanityImageSource) {
  return builder.image(source)
}
// to fetch data from sanity
const getProducts = async()=>{
    const response = await client.fetch(`*[_type=='product']{_id,title,description,price,image,category -> {title}}`);
    return response;
  }
  
  // make types for the data fetched from sanity
  interface IProduct {
    _id: string,
    title: string,
    description: string,
    price: number,
    image: File,
    category: {
      title: string
    }
  }

const SliderImages = async() => {
    const productsData:IProduct[] = await getProducts();
  return (
    <div>
        <Swiper breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={10}
      >
        
          {productsData.map((item, index)=>(
            <SwiperSlide key={index}>
                <div  className="flex flex-col justify-center px-6 mt-20 mb-16 py-10 items-center">
                    <div className="flex flex-col justify-center items-start  mx-10 w-full hover:scale-110 ease-in duration-300 gap-3">
                        <Link href={`/products/${item.title}`} key={item._id}>
                            <div>
                                <Image src={urlFor(item.image).url()} width='500' height='500' alt={item.title} />
                                <h2 className="text-gray-700 text-2xl font-extrabold font-mono mt-3">{item.title}</h2>
                                <p className=" text-gray-700 mt-2 font-extrabold font-mono text-2xl">${item.price}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </SwiperSlide>
            ))}
        

      </Swiper>
    </div>
  )
}

export default SliderImages

{/* <div className=" flex flex-row flex-wrap gap-11 px-6 mt-20 mb-16">
{productsData.map((item)=>(
  <Link href={`/products/${item.title}`} key={item._id}>
   <div>
      <Image src={urlFor(item.image).url()} width='500' height='500' alt={item.title} />
        <h2 className="text-gray-700 text-2xl font-extrabold font-mono mt-3">{item.title}</h2>
        <p className=" text-gray-700 mt-2 font-extrabold font-mono text-2xl">${item.price}</p>
   </div>
  </Link>
  ))}
</div> */}