import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ISanityProduct {
    _id: string,
    title: string,
    description: string,
    price: number,
    image: File, 
    item: string,
    quantity: number,
    category: {
      title: string
    }
    // totalPrice: number;
    
  }

export interface CartState {
  items: ISanityProduct[];
  totalAmount: number;
  totalQuantity: number,
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state:CartState, actions: PayloadAction<{product: ISanityProduct; quantity: number}>) => {
      state.totalQuantity += actions.payload.quantity;
      state.totalAmount += actions.payload.quantity * actions.payload.product.price;
      const newItem = actions.payload.product;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (!existingItem) {
        // const totalPrice = newItem.price * actions.payload.quantity;
        state.items.push({
          ...newItem,
          quantity: actions.payload.quantity
        });
      } else {
        // const totalPrice = existingItem.totalPrice + existingItem.price * actions.payload.quantity;
        existingItem.quantity += actions.payload.quantity;
        // existingItem.totalPrice = totalPrice;
      }

    },
    removeFromCart: (state: CartState, actions: PayloadAction<string>) => {
      // state.totalQuantity -= actions.payload.quantity;
      state.totalQuantity--;
      const productId = actions.payload;
      const existingItem = state.items.find(item => item._id == productId);
      state.totalAmount = state.totalAmount - existingItem?.price!;
      if(existingItem?.quantity === 1){
        state.items = state.items.filter(item => item._id !== productId);
      }
      else{
        existingItem!.quantity--;
        // existingItem!.totalPrice = existingItem!.totalPrice - existingItem?.totalPrice!;
      }
    },
    delteProduct: (state: CartState, actions: PayloadAction<string>) => {
      const productId = actions.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity , 0 );
      state.totalAmount = state.items.reduce((total, item) => total + item.price,0) // providing item.price which is total price of item stored in db
    },
    clearCart: (state) => {
      state = initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export default cartSlice.reducer