import React from 'react'
import SectionHeading from '../SectionsHeading/SectionHeading'
import Card from '../../Card/Card'

const Category = ({title,data}) => {
  return (
    <>
    <SectionHeading title={title}/>
    <div className='flex items-center px-8 flex-wrap'>
    {data && data?.map((item,index)=>{
        return (
            <Card key={index} title={item?.title} description={item?.description} imagePath={item?.image}
             actionArrow={true} height={'240px'} width={'200px'}/>
        )
    })}
    </div>
    </>
  )
}

export default Category