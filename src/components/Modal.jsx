import React from 'react'

function Modal({children, openModal, setOpenModal}) {
    console.log(openModal);
    
  return (
    <div onClick={(e) => e.target.id =='wrapper' ? setOpenModal(false) : ""} id='wrapper' className={`${openModal ? 'scale-1' : 'scale-0'} fixed inset-0 flex justify-center items-center backdrop-blur`}>
        <div className='w-[500px]'>
            {children}
        </div>
    </div>
  )
}

export default Modal
