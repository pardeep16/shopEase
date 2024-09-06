import React, { useMemo } from 'react'
import SvgStarIcon from '../common/SvgStarIcon';
import { SvgEmptyStar } from '../common/SvgEmptyStar';

const Rating = ({rating}) => {
  const ratingNumber = useMemo(()=>{
    return Array(Math.floor(Number(rating))).fill()
  },[rating]);

  return (
    <div className='flex items-center'>
        {ratingNumber?.map((_,index)=>(
            <SvgStarIcon key={index}/>
        ))}
        {
        new Array(5-ratingNumber?.length).fill().map((_,index)=>(
            <SvgEmptyStar key={'empty-'+index}/>
        ))          
        }
        <p className='px-2 text-gray-500'>{rating}</p>
    </div>
  )
}

export default Rating