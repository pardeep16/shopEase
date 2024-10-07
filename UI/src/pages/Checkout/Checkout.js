import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/features/cart';
import { fetchUserDetails } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';
import { useNavigate } from 'react-router-dom';
import PaymentPage from '../PaymentPage/PaymentPage';


const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo,setUserInfo] = useState([]);
  const navigate = useNavigate();
  const [paymentMethod,setPaymentMethod] = useState('');

  const subTotal = useMemo(()=>{
    let value = 0;
    cartItems?.forEach(element => {
       value += element?.subTotal 
    });
    return value?.toFixed(2);
  },[cartItems]);

  useEffect(()=>{
    dispatch(setLoading(true))
    fetchUserDetails().then(res=>{
      setUserInfo(res);
    }).catch(err=>{

    }).finally(()=>{
      dispatch(setLoading(false))
    })
  },[dispatch]);
  
  return (
    <div className='p-8 flex'>
      <div className='w-[70%]'>
        <div className='flex gap-8'>
          {/* Address */}
          <p className='font-bold'>Delivery address</p>
          {userInfo?.addressList && 
          <div>
            <p>{userInfo?.addressList?.[0]?.name}</p>
            <p>{userInfo?.addressList?.[0]?.street}</p>
            <p>{userInfo?.addressList?.[0]?.city},{userInfo?.addressList?.[0]?.state} {userInfo?.addressList?.[0]?.zipCode}</p>
          </div>}
        </div>
        <hr className='h-[2px] bg-slate-200 w-[90%] my-4'></hr>    
        <div className='flex gap-8 flex-col'>
          {/* Address */}
          <p className='font-bold'>Choose delivery</p>
          <div>
            <p>Select a day</p>
            <div className='flex gap-4 mt-4'>
                  <div className='w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer
                   hover:scale-110 bg-gray-200 border-gray-500 text-gray-500'><p className='text-center'>{'Oct 5'}</p></div>

            <div className='w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer
                   hover:scale-110 bg-white border-gray-500 text-gray-500'><p className='text-center'>{'Oct 8'}</p></div>
                  
                  </div>
          </div>
        </div>
        <hr className='h-[2px] bg-slate-200 w-[90%] my-4'></hr>
        <div className='flex flex-col gap-2'>
          {/* Address */}
          <p className='font-bold'>Payment Method</p>
          <div className='mt-4 flex flex-col gap-4'>
            <div className='flex gap-2'>
            <input type='radio' name='payment_mathod' value={'CARD'} onChange={()=> setPaymentMethod('CARD')}/>
            <p> Credit/Debit Card</p>
            </div>
            <div className='flex gap-2'>
            <input type='radio' name='payment_mathod' value={'COD'} onChange={()=> setPaymentMethod('COD')}/>
            <p> Cash on delivery</p>
            </div>
            <div className='flex gap-2'>
            <input type='radio' name='payment_mathod' value={'UPI'} onChange={()=> setPaymentMethod('COD')}/>
            <p> UPI/Wallet</p>
            </div>

          </div>
        </div>
        {paymentMethod === 'CARD' && <PaymentPage userId={userInfo?.id} addressId={userInfo?.addressList?.[0]?.id}/>}
        
        {paymentMethod !== 'CARD' && <button className='w-[150px] items-center h-[48px] bg-black border rounded-lg mt-4 text-white hover:bg-gray-800' onClick={()=> navigate('/payment')}>Pay Now</button>}
      </div>
      <div className='w-[30%] h-[30%] border rounded-lg border-gray-500 p-4 flex flex-col gap-4'>
        <p>Order Summary</p>
        <p>Items Count = {cartItems?.length}</p>
        <p>SubTotal = ${subTotal}</p>
        <p>Shipping = FREE</p>
        <hr className='h-[2px] bg-gray-400'></hr>
        <p>Total Amount = ${subTotal}</p>
      </div>

    </div>
  )
}

export default Checkout