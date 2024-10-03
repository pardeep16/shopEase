import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import BckgImage from '../assets/img/bg-1.png';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';

const AuthenticationWrapper = () => {

  const isLoading = useSelector((state)=> state?.commonState?.loading);
  return (
    <div>
        <Navigation variant="auth"/>
        <div className='flex'>
            <div className='w-[60%] lg:w-[70%] hidden md:inline py-2'>
              <img src={BckgImage} className='bg-cover w-full bg-center' alt='shoppingimage'/>
            </div>
            <div>
            <Outlet />
            </div>
            {isLoading && <Spinner />}
        </div>
    </div>
  )
}

export default AuthenticationWrapper