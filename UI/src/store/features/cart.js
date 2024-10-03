import { createSlice } from "@reduxjs/toolkit"

// {id:Number,quantity:number}

const initialState = {
    cart:JSON.parse(localStorage.getItem('cart')) || []
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
            return {
                ...state,
                cart :  state?.cart?.filter((item) => ((item.id !== action?.payload?.productId) && (item?.variant?.id !== action?.payload?.variantId)))
            }
        },
        updateQuantity:(state,action) =>{
            return {
                ...state,
                cart: state?.cart?.map((item)=>{
                    if(item?.variant?.id === action?.payload?.variant_id){
                        return {
                            ...item,
                            quantity:action?.payload?.quantity,
                            subTotal: action?.payload?.quantity * item.price
                        }
                    }
                    return item;
                })
            };
        },
        deleteCart : (state,action)=>{
            return {
                ...state,
                cart:[]
            }
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, deleteCart } = cartSlice?.actions;

export const countCartItems = (state) => state?.cartState?.cart?.length;
export const selectCartItems = (state) => state?.cartState?.cart ?? []
export default cartSlice.reducer;

