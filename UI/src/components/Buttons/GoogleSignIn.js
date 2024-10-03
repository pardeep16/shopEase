import React, { useCallback } from 'react'
import GoogleLogo from '../../assets/img/Google.png'
import { API_BASE_URL } from '../../api/constant'
const GoogleSignIn = () => {

  const handleClick = useCallback(()=>{
    window.location.href = API_BASE_URL +"/oauth2/authorization/google";
  },[])

  return (
    <button onClick={handleClick} className='flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50'>
        <img src={GoogleLogo} alt='google-icon'/>
        <p className='px-2 text-gray-500'>Continue With Google</p>
    </button>
  )
}

export default GoogleSignIn