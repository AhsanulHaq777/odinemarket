import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// interface IProduct {
//     _id: string,
//     title: string,
//     description: string,
//     price: number,
//     image: File, 
//     item: string,
//     category: {
//       title: string
//     }
//   }

export interface CartState {
//   value: number;
//   items: IProduct[];
//   totalAmount: number;
  totalQuantity: number
}

const initialState: CartState = {
//   value: 0,
//   items: [],
//   totalAmount: 0,
  totalQuantity: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<any>) => {
      state.totalQuantity += actions.payload.quantity;
    },
    removeFromCart: (state, actions: PayloadAction<any>) => {
      // state.totalQuantity -= actions.payload.quantity;
      state.totalQuantity <= 0 ? 0 : state.totalQuantity -= actions.payload.quantity;
    },
    clearCart: (state) => {
      state = initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export default cartSlice.reducer