import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'



function SinglePage() {
  const { singlePerson } = useContext(Context)
  const navigate = useNavigate()
  return (
    <div className={'mx-auto px-5 max-w-[1100px]'}>
      <div className='py-5 mb-[60px] px-10 dark:!text-white flex items-center dark:bg-[#180161] space-x-4 rounded-b-[30px] shadow-lg'>
        <ArrowLeftOutlined className='scale-[1.5]' onClick={() => navigate(-1)} />
        <h2 className='text-2xl '>{singlePerson.name}</h2>
      </div>
      <div className='w-[600px] dark:!text-white  flex gap-[100px] items-center rounded-lg p-4 shadow-2xl dark:bg-[#180161] bg-white mx-auto'>
        <UserOutlined className='p-1 bg-gray-300 dark:text-black rounded-full ml-[60px]  block scale-[6]' />
        <div>
          <div className='py-1 flex items-center space-x-5'>
            <span className='text-lg font-bold'>Name:</span>
            <strong className='text-xl italic font-normal dark:opacity-70'>{singlePerson.name}</strong>
          </div>
          <div className='py-1 flex items-center space-x-5'>
            <span className='text-lg font-bold'>Surname:</span>
            <strong className='text-xl italic font-normal dark:opacity-70'>{singlePerson.surname}</strong>
          </div>
          <div className='py-1 flex items-center space-x-5'>
            <span className='text-lg font-bold'>Email:</span>
            <strong className='text-xl italic font-normal dark:opacity-70'>{singlePerson.email}</strong>
          </div>
          <div className='py-1 flex items-center  space-x-5'>
            <span className='text-lg font-bold'>Bio:</span>
            <p className='text-xl italic  w-[43%] whitespace-normal overflow-ellipsis overflow-hidden dark:opacity-70'>{singlePerson.bio}</p>
          </div>
          <div className='py-1 flex items-center space-x-5'>
            <span className='text-lg font-bold'>{singlePerson.job ? 'Job:' : 'Study or Hobby:'}</span>
            <strong className='text-xl italic font-normal dark:opacity-70'>{singlePerson.job ? singlePerson.job : singlePerson.study}</strong>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SinglePage
