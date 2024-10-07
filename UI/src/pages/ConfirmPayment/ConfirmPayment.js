import { useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { confirmPaymentAPI } from '../../api/order';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/common';
import Spinner from '../../components/Spinner/Spinner';
import { clearCart } from '../../store/actions/cartAction';

const ConfirmPayment = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [errorMessage,setErrorMessage] = useState('');
    const isLoading = useSelector((state)=> state?.commonState?.loading);
    const navigate = useNavigate();
   

    useEffect(()=>{

        const query = new URLSearchParams(location.search);
        const clientSecret = query.get('payment_intent_client_secret');
        const redirectStatus = query.get('redirect_status');
        const paymentIntent = query.get('payment_intent');
        if(redirectStatus === 'succeeded'){
            dispatch(setLoading(true));
            dispatch(clearCart());
            confirmPaymentAPI({
                paymentIntent: paymentIntent,
                status:paymentIntent
            }).then(res=>{
                const orderId = res?.orderId;
                navigate(`/orderConfirmed?orderId=${orderId}`)
            }).catch(err=>{
                setErrorMessage("Something went wrong!");
            }).finally(()=>{
                dispatch(setLoading(false));
            })
        }

        else{
            setErrorMessage('Payment Failed - '+redirectStatus)
        }

        
    },[dispatch, location.search, navigate]);

  
  return (
    <>
    <div>Processing Payment...</div>
    {isLoading && <Spinner />}
    </>
  )
}

export default ConfirmPayment