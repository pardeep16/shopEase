import { createSlice } from "@reduxjs/toolkit"

// {id:Number,quantity:number}

const initialState = {
    cart:[]
}

const cartSlice = createSlice({
    name:'cartState',
    initialState:initialState,
    reducers:{
        addToCart:(state,action) =>{
            state.cart.push(action?.payload)
            return state;
        },
        removeFromCart:(state,action)=>{
            return state?.cart?.filter((item) => item.id !== action?.payload);
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice?.actions;
export default cartSlice.reducer;

