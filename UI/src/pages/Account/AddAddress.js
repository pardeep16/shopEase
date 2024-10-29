import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { addAddressAPI } from '../../api/userInfo';
import { saveAddress } from '../../store/features/user';

const AddAddress = ({onCancel}) => {
    const [values,setValues] = useState({
        name:'',
        phoneNumber:'',
        street:'',
        city:'',
        state:'',
        zipCode:''
    });
const [error,setError] = useState('');
const dispatch = useDispatch();

const onSubmit = useCallback((evt)=>{
    evt.preventDefault();
    dispatch(setLoading(true));
    setError('');
    addAddressAPI(values).then(res=>{
        dispatch(saveAddress(res));
        onCancel && onCancel();
    }).catch(err=>{
        setError('Address was not added.')
    }).finally(()=>{
        dispatch(setLoading(false));
    });
},[dispatch,onCancel,values]);

const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]:e.target?.value,
    }))
  },[]);


  return (
    <div>
        <p className='text-xl pt-4'>Add Address</p>
        <form onSubmit={onSubmit} className='pt-2 mb-2 md:w-[420px] w-full'>
            <label>Full Name</label>
            <input type='text' name='name' value={values?.name} onChange={handleOnChange} placeholder='Contact person name'
             className='w-full border p-2 my-2 border-gray-400' required/>
             <label>Phone Number</label>
            <input type='text' name='phoneNumber' value={values?.phoneNumber} onChange={handleOnChange} placeholder='Contact number'
             className='w-full border p-2 my-2 border-gray-400' required/>
             <label>Address</label>
            <input type='text' name='street' value={values?.street} onChange={handleOnChange} placeholder='Address'
             className='w-full border p-2 my-2 border-gray-400' required/>
             <div className='flex gap-4'>
             <input type='text' name='city' value={values?.city} onChange={handleOnChange} placeholder='City'
             className='w-full border p-2 my-2 border-gray-400' required/>
            <input type='text' name='state' value={values?.state} onChange={handleOnChange} placeholder='State'
             className='w-full border p-2 my-2 border-gray-400' required/>
             </div>
             <input type='text' name='zipCode' value={values?.zipCode} onChange={handleOnChange} placeholder='Zip code'
             className='w-full border p-2 my-2 border-gray-400' required/>
            <div className='flex gap-4 mt-4'>
                <button onClick={onCancel} type='button' className='border-2 border-gray-400
                rounded-lg w-[120px] h-[42px]'>Cancel</button>
                 <button  type='submit' className='bg-black
                rounded-lg w-[120px] h-[42px] text-white'>Save</button>
            </div>
        </form>
        {error && <p className='text-lg text-red-700'>{error}</p>}
    </div>
  )
}

export default AddAddress