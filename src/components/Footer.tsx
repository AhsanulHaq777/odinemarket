import Image from "next/image";
import { Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "./ui/button";

export default function Footer(){
    return(
        <>
            <div className='grid grid-cols-5 gap-16 m-auto justify-between px-36'>
                <div className=" flex flex-col col-span-2">
                    <div>
                        <Image src='/Logo.webp' alt='footer_logo' height='175' width='155'/>
                    </div>
                    <p className=" text-xl tracking-normal font-mono pt-10 text-gray-600">Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
                    <div className="flex flex-row gap-4 mt-10">
                        <Button className=" bg-gray-200 text-xl py-6 px-3"><Twitter/></Button>
                        <Button className=" bg-gray-200 text-xl py-6 px-3"><Facebook/></Button>
                        <Button className=" bg-gray-200 text-xl py-6 px-3"><Linkedin/></Button>
                    </div>
                </div>
                <div className="flex flex-col font-mono ">
                    <h2 className=" text-2xl font-bold text-gray-600">Company</h2>
                    <ul className=" text-xl font-medium text-gray-500 pt-4 leading-10">
                        <li>About</li>
                        <li>Terms of Use</li>
                        <li>Privacy Policy</li>
                        <li>How it Works</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="flex flex-col font-mono">
                    <h2 className="text-2xl font-bold text-gray-600">Support</h2>
                    <ul className=" text-xl font-medium text-gray-500 pt-4 leading-10">
                        <li>Support Carrer</li>
                        <li>24h Service</li>
                        <li>Quick Chat</li>
                    </ul>
                </div>
                <div className="flex flex-col font-mono">
                    <h2 className="text-2xl font-bold text-gray-600">Contact</h2>
                    <ul className=" text-xl font-medium text-gray-500 pt-4 leading-10">
                        <li>Whatapp</li>
                        <li>Support 24h</li>
                    </ul>
                </div>
            </div>
            <hr className=" h-[1px] mx-auto bg-black border-0 mt-[200px]"/>
           
                <div className=" grid grid-cols-3 gap-10 my-5 m-auto justify-between px-36">
                    <div className="text-lg flex flex-col font-medium text-gray-600"><p>Copyright © 2022 Dine Market</p></div>
                    <div className="text-lg flex flex-col font-medium"><p className="text-gray-600">Design by. <span className=" font-bold text-black">Bold Design Studio</span></p></div>
                    <div className="text-lg flex flex-col font-medium"><p className="text-gray-600">Code by. <span className=" text-black font-bold">ahsanulhaq on github</span></p></div>
                </div>
            
        </>
    );
}