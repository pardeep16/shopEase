import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ links }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {links?.map((link,index) => (
                    <li key={index} className='inline-flex items-center'>
                        <Link to={link?.path} className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-black'>
                           
                            {link?.title}
                        </Link>
                        {(links?.length -1 ) !== index &&
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        }
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb