import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/features/common';
import { cancelOrderAPI, fetchOrderAPI } from '../../api/userInfo';
import { cancelOrder, loadOrders, selectAllOrders } from '../../store/features/user';
import moment from 'moment';
import Timeline from '../../components/Timeline/Timeline';
import { getStepCount } from '../../utils/order-util';

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter,setSelectedFilter] = useState('ACTIVE');
  const [orders,setOrders]= useState([]);
  const [selectedOrder,setSelectedOrder] = useState('');

  useEffect(()=>{
    dispatch(setLoading(true));
    fetchOrderAPI().then(res=>{
      dispatch(loadOrders(res));
    }).catch(err=>{

    }).finally(()=>{
      dispatch(setLoading(false));
    })
  },[dispatch]);

  useEffect(()=>{
    const displayOrders=[];
    allOrders?.map(order=>{

      displayOrders.push({
        id:order?.id,
        orderDate:order?.orderDate,
        orderStatus: order?.orderStatus,
        status:(order?.orderStatus === 'PENDING' || order?.orderStatus === 'IN_PROGRESS' || order?.orderStatus === 'SHIPPED')? 'ACTIVE': order?.orderStatus === 'DELIVERED' ? 'COMPLETED':order?.orderStatus,
        items:order?.orderItemList?.map(orderItem=>{
          return {
            id:orderItem?.id,
            name:orderItem?.product?.name,
            price: orderItem?.product?.price,
            quantity:orderItem?.quantity,
            url:orderItem?.product?.resources?.[0]?.url,
            slug:orderItem?.product?.slug,
          }
        }),
        totalAmount: order?.totalAmount, 
      })
    });
    setOrders(displayOrders);

  },[allOrders]);

  const handleOnChange = useCallback((evt)=>{
    const value = evt?.target?.value;
    setSelectedFilter(value);
  },[]);

  const onCancelOrder = useCallback((id)=>{
    dispatch(setLoading(true));
    cancelOrderAPI(id).then(res=>{
      dispatch(cancelOrder(id));
    }).catch(err=>{

    }).finally(()=>{
      dispatch(setLoading(false));
    });
  },[dispatch])

  return (
    <div>
      {
        orders?.length > 0 && <div className='md:w-[70%] w-full'>
          <div className='flex justify-between'>
          <h1 className='text-2xl mb-4'>My Orders</h1>
          <select className='border-2 rounded-lg mb-4 p-2' value={selectedFilter} onChange={handleOnChange}>
              <option value={'ACTIVE'}>Active</option>
              <option value={'CANCELLED'}>Cancelled</option>
              <option value={'COMPLETED'}>Completed</option>
          </select>
          </div>
          {
            orders?.map((order,index)=>{
              return (
                order?.status ===selectedFilter && <div key={index}><div className='bg-gray-200 p-4 mb-8'>
                  <p className='text-lg font-bold'>Order no. #{order?.id}</p>
                  <div className='flex justify-between mt-2'>
                    <div className='flex flex-col text-gray-500 text-sm'>
                      <p>Order Date : {moment(order?.orderDate).format('MMMM DD YYYY')}</p>
                      <p>Expected Delivery Date: {moment(order?.orderDate).add(3,'days').format('MMMM DD YYYY')}</p>
                    </div>
                    <div className='flex flex-col text-gray-500 text-sm'>
                      <p>Order Status : {order?.orderStatus}</p>
                      <button onClick={()=> setSelectedOrder(order?.id)} className='text-blue-900 text-right rounded underline cursor-pointer'>View Details</button>
                    </div>
                  </div>
                </div>

                {selectedOrder === order?.id && <div>
                  {
                    order?.items?.map((orderItem,index)=>{
                      return (
                        <div key={index} className='flex gap-4'>
                          <img src={orderItem?.url} alt={orderItem?.name} className='w-[120px] h-[120px] object-cover m-2 rounded' />
                          <div className='flex flex-col text-sm py-2 text-gray-600'>
                            <p>{orderItem?.name || 'Name'}</p>
                            <p>Quantity {orderItem?.quantity}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className='flex justify-between'>
                    <p>Total : ${order?.totalAmount}</p>
                    <button onClick={()=> setSelectedOrder('')} className='text-blue-900 text-right rounded underline cursor-pointer'>Hide Details</button>
                  </div>
                  {
                    order?.orderStatus !== 'CANCELLED' && <>
                    <Timeline stepCount={getStepCount[order?.orderStatus]}/>
                    {
                      getStepCount[order?.orderStatus] <=2 && 
                      <button onClick={()=> onCancelOrder(order?.id)} className='bg-black h-[42px] w-[120px] text-white rounded-lg mb-2'>Cancel Order</button>
                    }
                    </>
                  }

                  </div>}
                
                </div>
                
              )
            })
          }

        </div>
      }
    </div>
  )
}

export default Orders