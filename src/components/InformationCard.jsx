import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import React from 'react'

function InformationCard({ item, onClick, editClick }) {
    return (
        <li className='p-4 w-[700px] bg-slate-200 dark:bg-[#180161] dark:text-white rounded-lg'  >
            <div className='flex items-center py-4 border-b-[1px] border-b-gray-400 justify-between'>
                <span className='text-lg font-bold'>Fullname:</span>
                <strong className='text-lg italic font-normal'>{item.name + "_" + item.surname}</strong>
            </div>
            <div className='flex items-center border-b-[1px] border-b-gray-400 py-4 justify-between'>
                <span className='text-lg font-bold'>Email:</span>
                <strong className='text-lg italic font-normal underline text-blue-500'>{item.email}</strong>
            </div>
            <div className='flex items-center border-b-[1px] border-b-gray-400 py-4 justify-between'>
                <span className='text-lg font-bold'>{item.job ? 'Job' : 'Hobby or study'}</span>
                <strong className='text-lg italic font-normal'>"{item.job ? item.job : item.study}"</strong>
            </div>
            <div className='flex items-center py-4 justify-between'>
                <span className='text-lg font-bold'>Actions:</span>
                <div className='flex items-center space-x-8 '>
                    <EllipsisOutlined className='scale-150 hover:scale-[1.8] duration-300  p-1 hover:bg-[#00000011] rounded-full' />
                    <DeleteOutlined onClick={() => onClick(item.id)} className='scale-125 hover:scale-[1.5] duration-300 p-1 hover:text-red-500 hover:bg-[#00000011] rounded-full' />
                    <EditOutlined onClick={() => editClick(item.id)} className='scale-125 hover:scale-[1.5] duration-300 hover:!text-blue-500 p-1 hover:bg-[#00000011] rounded-full' />
                </div>
            </div>

        </li>
    )
}

export default InformationCard
