import { Button } from "@/components/ui/button"
import {FiShoppingCart} from "react-icons/fi"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import {client} from '@/lib/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

// to build a url of an image data fetched from sanity
const builder = imageUrlBuilder(client)
function urlFor(source: File | SanityImageSource) {
  return builder.image(source)
}
// to fetch data from sanity
export const getProducts = async()=>{
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

export default async function Home() {
  // const testdata  = await getProducts()
  // const testimg = urlFor(testdata[0].image).width(700).url()
  // console.log(testimg)
  const productsData:IProduct[] = await getProducts();
  return (
    <>
      <div className='flex flex-row m-auto justify-around gap-10 px-36' >
        <div className="mt-14">
          <Button variant="secondary" className=" bg-blue-100 w-32 text-indigo-700 font-mono text-xl font-extrabold">Sale 70%</Button>
          <h1 className="text-4xl mt-10 font-extrabold lg:text-6xl tracking-wide">
            An Industrial Take on Streetwear
          </h1>
          <p className="mt-12 text-lg pr-44">
            Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
          </p>
          <div className=" mt-12">
            <button className=" bg-black justify-center items-center flex px-6 py-5 text-white font-mono text-xl font-extrabold gap-3">
              <FiShoppingCart/>Start Shopping
            </button>
          </div>
          <div className=" flex flex-row m-auto gap-7 justify-around mt-36">
            <div><Image src='/Featured1.webp' alt="feature-image1" width='110' height='110'/></div>
            <div><Image src='/Featured2.webp' alt="feature-image2" width='110' height='110'/></div>
            <div><Image src='/Featured3.webp' alt="feature-image3" width='110' height='110'/></div>
            <div><Image src='/Featured4.webp' alt="feature-image4" width='110' height='110'/></div>
          </div>
        </div>
        <div className="bg-[#fae3d7] rounded-full">
          <div className=" mt-[-35px]">
            <Image src='/header.webp' alt="hero-image" width='1250' height='1200'/>
          </div> 
        </div>
      </div>
      <div className='m-auto justify-around px-36 mt-28' >
        <div className=" text-center ">
          <span className=" text-indigo-700 font-sans text-sm font-bold tracking-widest">PROMOTIONS</span>
          <h1 className=" text-4xl font-extrabold tracking-wide mt-4">Our Promotions Events</h1>
        </div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-4 mt-9 mb-16">
            <div className=" bg-zinc-300 col-span-2 flex flex-row justify-around">
              <div className=" justify-center flex flex-col">
                <h2 className=" font-bold text-3xl tracking-wide">GET UP TO <span className=" text-4xl">60%</span></h2>
                <p className=" text-xl">For the summer season</p>
              </div> 
              <Image src='/promo1.webp' alt="promo1" width='282' height='218'/> 
            </div>
            <div className=" bg-orange-200 row-span-2 flex flex-col">
              <div className="pl-6 pt-7">
                  <p className=" text-lg font-mono">Flex Sweatshirt</p>
                  <p className=" text-2xl font-mono font-bold"><del className=" font-light font-mono">$100.00</del>  $75.00</p>
              </div> 
              <div className=" flex justify-center mt-5">
                <Image src='/promo2.webp' alt="promo1" width='282' height='362'/>
              </div>
            </div>
            <div className=" bg-zinc-300 row-span-2 flex flex-col">
              <div className="pl-6 pt-7">
                  <p className=" text-lg font-mono">Flex Push Button Bomber</p>
                  <p className=" text-2xl font-mono font-bold"><del className=" font-light font-mono">$225.00</del>  $190.00</p>
              </div> 
              <div className=" flex justify-center mt-5">
                <Image src='/promo3.webp' alt="promo1" width='282' height='368'/>
              </div>
            </div>
            <div className=" bg-black text-white col-span-2 flex flex-row justify-around">
              <div className=" justify-center items-center flex flex-col">
                <h2 className=" font-bold text-5xl pt-9 tracking-wide">GET 30% Off</h2>
                <p className=" text-md mt-5">USE PROMO CODE</p>
                <Button className=" bg-zinc-500 text-white tracking-[4px] w-full text-lg font-semibold">DINEWEEKENDSALE</Button>
              </div> 
            </div>
        </div>
      </div>
      <div className='m-auto justify-around px-36 mt-32'>
        <div className=" text-center ">
          <span className=" text-indigo-700 font-sans text-sm font-bold tracking-widest">PRODUCTS</span>
          <h1 className=" text-4xl font-extrabold tracking-wide mt-4">Check What We Have</h1>
        </div>
        <div className=" flex flex-row gap-11 px-6 mt-20 mb-16">
            {productsData.map((item)=>(
              <div key={item._id}>
                <Image src={urlFor(item.image).url()} width='500' height='500' alt="products" />
                {/* <Image src='https://cdn.sanity.io/images/czlfkjkf/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png?w=700' width='600' height='600' alt="products" /> */}
                <h2 className="text-gray-700 text-2xl font-extrabold font-mono mt-3">{item.title}</h2>
                <p className=" text-gray-700 mt-2 font-extrabold font-mono text-2xl">${item.price}</p>
              </div>
            ))}
        </div>
      </div>
      <div className='m-auto justify-around mt-32'>
        <div >
          <h1 className="px-36 text-[50px] tracking-normal  leading-tight  font-black font-mono ml-[795px] mt-4">Unique and Authentic Vintage Designer Jewellery</h1>
        </div>
        <div className="flex flex-row gap-10 px-36 pt-10 pb-20 bg-[#fbfcff]">
          <div className="  w-1/2 justify-center items-center mt-5 relative">
            <div className="w-full font-extrabold text-9xl opacity-70 absolute text-[#ebecef]">Different from others</div>
            <div className=" grid grid-cols-2 gap-12 mt-4 relative">
              <div className="pr-24">
                <h3 className=" font-semibold mb-4 text-xl">Using Good Quality Materials</h3>
                <p className=" text-lg mt-4">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
              </div>
              <div className="pr-24 ">
                <h3 className=" font-semibold mb-4 text-xl">100% Handmade Products</h3>
                <p className=" text-lg mt-4">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
              </div>
              <div className="pr-24 ">
                <h3 className=" font-semibold mb-4 text-xl">Modern Fashion Design</h3>
                <p className=" text-lg mt-4">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
              </div>
              <div className="pr-24 ">
                <h3 className=" font-semibold mb-4 text-xl">Discount for Bulk Orders</h3>
                <p className=" text-lg mt-4">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-10 w-1/2 h-80">
            <div className=" w-1/2">
              <Image src='/vintage_design_right.webp' alt="vintage_hero_page" width='350' height='400' />
            </div>
            <div className=" w-1/2 items-center">
              <p className=" text-lg mt-16 justify-center items-center text-justify">
                This piece is ethically crafted in our small family-owned workshop in Peru 
                with unmatched attention to detail and care. The Natural color is the actual 
                natural color of the fiber, undyed and 100% traceable.
              </p>
              <button className="mt-8 bg-black justify-center items-center flex px-5 py-2 text-white font-mono text-lg font-bold">
                See All Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="  m-auto justify-around mt-48 mb-56 text-center px-36 relative">
        <h2 className="ml-[350px] mt-5 font-extrabold text-9xl opacity-70 absolute text-[#ebecef]">Newsletter</h2>
        {/* <h2 className="w-full font-extrabold text-9xl opacity-70 absolute text-[#ebecef]">Newsletter</h2> */}
        <h1 className=" text-4xl font-extrabold tracking-wide relative">Subscribe Our Newsletter</h1>
        <p className="mt-7 text-lg justify-center relative">Get the latest information and promo offers directly</p>
        <form className="gap-3 mt-10 flex text-center justify-center items-center flex-row">
          <Input type="email" className=" border-[1px] border-slate-700 px-5 py-2 w-72" placeholder="Input email address"/>
          <button type="submit" className=" bg-black justify-center items-center tracking-tighter flex px-5 py-2 text-white font-mono text-lg font-bold">
            Get Started
          </button>
        </form>
      </div>
    </>
  )
}
