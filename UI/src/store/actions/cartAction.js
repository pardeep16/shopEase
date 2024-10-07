import { addToCart, deleteCart, removeFromCart, updateQuantity } from "../features/cart"


export const addItemToCartAction = (productItem)=>{
    return (dispatch,state) =>{
        dispatch(addToCart(productItem));
        updateLocalStorage(state);
    }
}

export const updateItemToCartAction = (productItem) =>{
    return (dispatch,state) =>{
        dispatch(updateQuantity({
            variant_id: productItem?.variant_id,
            quantity: productItem?.quantity
        }))
        updateLocalStorage(state);

    }
}

export const delteItemFromCartAction = (payload)=>{
    return (dispatch,state)=>{
        dispatch(removeFromCart(payload));
        updateLocalStorage(state);
    }
}

const updateLocalStorage = (state)=>{
    const {cartState} = state();
    localStorage.setItem('cart',JSON.stringify(cartState?.cart))
}

export const clearCart = ()=>{
    return (dispatch,state) =>{
       dispatch(deleteCart());
       localStorage.removeItem('cart');
    }
}