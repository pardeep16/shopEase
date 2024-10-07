import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';

const OrderConfirmed = () => {

  const location = useLocation();

  const orderId = useMemo(()=>{
    const query = new URLSearchParams(location.search);
    const orderId = query.get('orderId');
    return orderId;
  },[location.search]);
  
  return (
    <div className='p-8'>
        <h1 className='text-2xl'>Thank you for shopping with us!</h1>
        <p>Your order has been successfully placed. Your order ID is <strong>{orderId}</strong>.</p>
    </div>
  )
}

export default OrderConfirmed