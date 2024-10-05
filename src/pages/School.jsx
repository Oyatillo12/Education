import { MoonFilled } from '@ant-design/icons'
import { Button, Input, } from 'antd'
import React, { useState } from 'react'
import Modal from '../components/Modal'
import useAxios from '../hook/useAxios'
import InformationCard from '../components/InformationCard'
import TextArea from 'antd/es/input/TextArea'
import LoadingImg from '../assets/images/loading.png'

function School() {
    const [isLoading,setIsLoading] = useState(false)
    const [personSelected, setPersonSelected] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [personID, setPersonID] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [showData, setShowData] = useState('1')
    const [showAddPerson, setShowAddPerson] = useState(false)
    const { data: students, postData: addStudent, deleteData:deleteStudent } = useAxios('/students');
    const { data: teachers, postData: addTeacher, deleteData: deleteTeacher } = useAxios('/teachers');

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [activity, setActivity] = useState(null)
    const [bio, setBio] = useState(null)

    function handleStudentAdd() {
        setOpenModal(true)
        setPersonSelected('1')
        setShowAddPerson(false)
    }
    function handleTeacherAdd() {
        setOpenModal(true)
        setPersonSelected('2')
        setShowAddPerson(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            email: e.target.email.value
        }

        if (personSelected === '1') {
            data.study = e.target.activity.value
            setIsLoading(true)
            setTimeout(() => {
                addStudent(data).then(res => {
                    setShowData('1')
                    setOpenModal(false)
                    setIsLoading(false)
                })
            }, 1000)
            
        } else {
            data.job = e.target.activity.value
            setIsLoading(true)
            setTimeout(() => {
                addTeacher(data).then(res => {
                    setShowData('2')
                    setOpenModal(false)
                    setIsLoading(false)
                })
            }, 1000)
        }
        setName(null)
        setSurname(null)
        setEmail(null)
        setActivity(null)
        setBio(null)
    }

    function handleDelete(id) {
        setDeleteModal(true)
        setPersonID(id)
    }
    function handleDeletePerson(){
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          if (showData === '1') {
            deleteStudent(personID);
          } else if (showData === '2') {
            deleteTeacher(personID);
          }
          setDeleteModal(false)
        }, 1000)
        
    }

    return (
        <>
            <div className='mx-auto px-5 max-w-[1100px]'>
                <div className='py-5 mb-[60px] px-10 flex items-center justify-between rounded-b-[30px] shadow-lg'>
                    <h1 className='text-[30px] leading-[35px] font-bold'>Our Education</h1>
                    <div className='flex items-center space-x-10 relative'>
                        <Button onClick={() => setShowAddPerson(!showAddPerson)} size='large' htmlType='button' type='default'>Add now</Button>
                        <MoonFilled className='scale-[2]' />
                        {showAddPerson && <div onClick={(e) => e.target.id == 'wrapper' ? setShowAddPerson(false) : ""} id='wrapper' className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10`}>
                            <div className=' w-[250px]  bg-white p-4 rounded-lg shadow-2xl'>
                                <p className='text-center text-lg mb-2'>Choose a category</p>
                                <div className='flex items-center justify-between'>
                                    <button onClick={handleStudentAdd} className='w-[48%] py-1 text-[16px] border rounded-lg border-gray-400 hover:bg-[#00000022] duration-300'>Student</button>
                                    <button onClick={handleTeacherAdd} className='w-[48%] py-1 text-[16px] border rounded-lg border-gray-400 hover:bg-[#00000022] duration-300'>Teacher</button>
                                </div>
                            </div>
                        </div>}
                    </div>

                </div>
                <div className='flex items-center justify-center space-x-6 my-6'>
                    <button type='button' onClick={() => setShowData('1')} className={`w-[130px] text-lg border-[1px] bg-blue-500 rounded-lg py-2 duration-500 text-white ${showData == '1' ? "border-blue-500 bg-transparent !text-blue-500" : ""}`}>Students</button>
                    <button type='button' onClick={() => setShowData('2')} className={`w-[130px] text-lg border-[1px] bg-blue-500 rounded-lg py-2 duration-500 text-white ${showData == '2' ? "border-blue-500 bg-transparent !text-blue-500" : ""}`}>Teachers</button>
                </div>
                <ul className='flex items-center justify-center flex-col space-y-6'>
                    {teachers || students ? 
                    <li className='flex items-center justify-between px-5 py-4 border-b-[1px] border-gray-200'>
                        <span className='text-lg'>No data available</span>
                    </li> :
                    showData == '1' ? students.map(item => <InformationCard onClick={handleDelete} key={item.id} item={item} />)
                        : teachers.map(item => <InformationCard onClick={handleDelete} key={item.id} item={item} />) }
                </ul>
            </div>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
                {isLoading ? <img className='absolute inset-0 m-auto' src={LoadingImg} alt='loading img' width={100} height={100}/> :
                <form onSubmit={handleSubmit} autoComplete='off' className='space-y-4 flex bg-white p-4 shadow-lg rounded-lg flex-col w-full'>
                    <h2 className='text-xl'>{personSelected == '1' ? 'Adding student' : 'Adding teacher'}</h2>
                    <Input onChange={(e) => setName(e.target.value)} value={name} className='text-lg' type='text' size='large' name='name' placeholder='Enter a name' required />
                    <Input onChange={(e) => setSurname(e.target.value)} value={surname} className='text-lg' type='text' size='large' name='surname' placeholder='Enter a surname' required />
                    <Input onChange={(e) => setEmail(e.target.value)} value={email} className='text-lg' type='email' size='large' name='email' placeholder='Enter a email' required />
                    <TextArea onChange={(e) => setBio(e.target.value)} value={bio} className='text-lg'
                        name='bio'
                        placeholder="Enter a bio"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <Input onChange={(e) => setActivity(e.target.value)} value={activity} className='text-lg' type='text' size='large' name='activity' placeholder={personSelected == '1' ? 'Enter hobby or title' : 'Enter a job'} required />
                    <div className='flex items-center justify-end'>
                        <Button type='default' htmlType='submit' size='large' className='px-5 py-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-400 duration-500'>Add</Button>
                    </div>
                </form> }
            </Modal>
            <Modal openModal={deleteModal} setOpenModal={setDeleteModal}>
                {isLoading ? <img className='absolute inset-0 m-auto' src={LoadingImg} alt='loading img' width={100} height={100}/> : 
                <div className='flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4'>
                    <h2 className='text-xl mb-3'>Are you sure you want to delete this record?</h2>
                    <div className='flex items-center justify-between w-full'>
                        <Button onClick={() => setDeleteModal(false)} type='default' size='large' className='w-[48%]'>Cancel</Button>
                        <Button onClick={handleDeletePerson} type='primary' size='large' className='bg-red-500 w-[48%] text-white hover:!bg-red-400'>Delete</Button>
                    </div>
                </div>}
            </Modal>
        
        </>         
        
    )
}

export default School
