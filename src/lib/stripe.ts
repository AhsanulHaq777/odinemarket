import { loadStripe, Stripe } from '@stripe/stripe-js'; 

let stripePromise: Promise<Stripe|null>;
const getStripePromise=()=>{
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
    if(!stripePromise && !!key){ // I have key but dont have promise
        stripePromise = loadStripe(key);
        
    }
    return stripePromise
}
export default getStripePromise