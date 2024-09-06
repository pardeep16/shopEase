import React, { useState } from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './PriceFilter.css';

const PriceFilter = () => {
    const [range,setRange] = useState({
        min:10,
        max:250
    })
  return (
    <div className='flex flex-col mb-4'>
        <p className='text-[16px] text-black mt-5 mb-5'>Price</p>
        <RangeSlider className={'custom-range-slider'} min={0} max={500} defaultValue={[range.min,range.max]} onInput = {(values)=> setRange({
            min:values[0],
            max:values[1]
        })}/>

        <div className='flex justify-between'>
            <div className='border rounded-lg h-8 mt-4 max-w-[50%] w-[40%] flex items-center'><p className='pl-4 text-gray-600'>$</p> <input type='number' value={range?.min} className='outline-none px-4 text-gray-600' min={0} max="499" disabled placeholder='min'/></div>
            <div className='border rounded-lg h-8 mt-4 max-w-[50%] w-[40%] flex items-center'><p className='pl-4 text-gray-600'>$</p> <input type='number' value={range?.max} className='outline-none px-4 text-gray-600' min={0} max="500" disabled placeholder='max'/></div>
        </div>
    </div>
  )
}

export default PriceFilter