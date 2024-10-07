import { MoonFilled, SunOutlined } from '@ant-design/icons'
import { Button, Input, } from 'antd'
import React, { useContext, useState } from 'react'
import Modal from '../components/Modal'
import useAxios from '../hook/useAxios'
import InformationCard from '../components/InformationCard'
import TextArea from 'antd/es/input/TextArea'
import LoadingImg from '../assets/images/loading.png'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

function School() {
    const navigate = useNavigate()
    const { setSinglePerson} = useContext(Context)
    const [editModal, setEditModal] = useState(false)
    const [person, setPerson] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [personSelected, setPersonSelected] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [personID, setPersonID] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [showData, setShowData] = useState('1')
    const [showAddPerson, setShowAddPerson] = useState(false)
    const { data: students, postData: addStudent, deleteData: deleteStudent, EditData: EditStudent } = useAxios('/students');
    const { data: teachers, postData: addTeacher, deleteData: deleteTeacher, EditData: EditTeacher } = useAxios('/teachers');

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [activity, setActivity] = useState(null)
    const [bio, setBio] = useState(null)

    const [mode, setMode] = useState(true)
    function handleStudentAdd() {
        setOpenModal(true)
        setPersonSelected('1')
        setShowAddPerson(false)
        setPerson(null)
        setName(null)
        setSurname(null)
        setEmail(null)
        setActivity(null)
        setBio(null)
    }
    function handleTeacherAdd() {
        setOpenModal(true)
        setPersonSelected('2')
        setShowAddPerson(false)
        setPerson(null)
        setName(null)
        setSurname(null)
        setEmail(null)
        setActivity(null)
        setBio(null)
    }
    function hadnleEdit(id) {
        setEditModal(true)
        if (showData === '1') {
            const findedStudent = students.find(item => item.id == id)

            setPerson(findedStudent)
            setName(findedStudent?.name)
            setSurname(findedStudent?.surname)
            setEmail(findedStudent?.email)
            setActivity(findedStudent?.study ? findedStudent?.study : findedStudent?.job)
            setBio(findedStudent?.bio)
        }
        else {
            const findedTeacher = teachers.find(item => item.id == id)

            setPerson(findedTeacher)
            setName(findedTeacher?.name)
            setSurname(findedTeacher?.surname)
            setEmail(findedTeacher?.email)
            setActivity(findedTeacher?.study ? findedTeacher?.study : findedTeacher?.job)
            setBio(findedTeacher?.bio)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            email: e.target.email.value,
            bio: e.target.bio.value,
        }
        setIsLoading(true)

        if (person) {
            if (showData == '1') {
                data.study = e.target.activity.value
                setTimeout(() => {
                    EditStudent(person.id, data).then(() => {
                        setShowData('1')
                        setEditModal(false)
                        toast.success('You edited student')
                        setIsLoading(false)
                        setPerson(null)
                    })
                }, 1000)
            }
            else {
                data.job = e.target.activity.value
                setTimeout(() => {
                    EditTeacher(person.id, data).then(() => {
                        setShowData('2')
                        setEditModal(false)
                        toast.success('You edited teacher')
                        setIsLoading(false)
                        setPerson(null)
                    })
                }, 1000)

            }
        }
        else {
            if (personSelected === '1') {
                data.study = e.target.activity.value
                toast.success('You added student')
                
                setTimeout(() => {
                    addStudent(data).then(res => {
                        setShowData('1')
                        setOpenModal(false)
                        setIsLoading(false)
                    })
                }, 1000)

            } else {
                data.job = e.target.activity.value
                toast.success('You added teacher')
                
                setTimeout(() => {
                    addTeacher(data).then(res => {
                        setShowData('2')
                        setOpenModal(false)
                        setIsLoading(false)
                    })
                }, 1000)
            }
        }

        setName(null)
        setSurname(null)
        setEmail(null)
        setActivity(null)
        setBio(null)
    }

    function handleMore(data){
        setIsLoading(true)
        setEditModal(true)
        setTimeout(() => {
            setSinglePerson(data)
            setIsLoading(false)
            setEditModal(false)
            navigate(`person/${data.id}`)
        },1000)
    }



    function handleDelete(id) {
        setDeleteModal(true)
        setPersonID(id)
    }
    function handleDeletePerson() {
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

    function handleMode() {
        document.documentElement.classList.toggle('dark')
        setMode(!mode)
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='mx-auto px-5 max-w-[1100px]'>
                <div className='py-5 mb-[60px] px-10 flex items-center dark:bg-[#180161] justify-between rounded-b-[30px] shadow-lg'>
                    <h1 className='text-[30px] leading-[35px] font-bold dark:text-white'>Our Education</h1>
                    <div className='flex items-center space-x-10 relative'>
                        <Button className='dark:bg-[#211951] dark:text-white dark:hover:!bg-transparent' onClick={() => setShowAddPerson(!showAddPerson)} size='large' htmlType='button' type='default'>Add now</Button>
                        {mode ? <MoonFilled onClick={handleMode} className='scale-[2] hover:opacity-60 duration-300' /> : <SunOutlined onClick={handleMode} className='scale-[2] text-white hover:opacity-60 duration-300  ' />}
                        {showAddPerson && <div onClick={(e) => e.target.id == 'wrapper' ? setShowAddPerson(false) : ""} id='wrapper' className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10`}>
                            <div className=' w-[250px]  bg-white dark:bg-[#17153B] dark:text-white p-4 rounded-lg shadow-2xl'>
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
                    {showData == '2' && teachers.length === 0 && <li className='flex items-center justify-between px-5 py-4 border-b-[1px] border-gray-200'>
                        <span className='text-lg dark:text-white'>No data available</span>
                    </li>}
                    {showData == '1' && students.length === 0 && <li className='flex items-center justify-between px-5 py-4 border-b-[1px] border-gray-200'>
                        <span className='text-lg dark:text-white'>No data available</span>
                    </li>}

                    {showData == '1' ? students.map(item => <InformationCard morePage={handleMore} editClick={hadnleEdit} onClick={handleDelete} key={item.id} item={item} />)
                        : teachers.map(item => <InformationCard morePage={handleMore} editClick={hadnleEdit} onClick={handleDelete} key={item.id} item={item} />)}

                </ul>
            </div>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
                {isLoading ? <img className='absolute inset-0 m-auto' src={LoadingImg} alt='loading img' width={100} height={100} /> :
                    <form onSubmit={handleSubmit} autoComplete='off' className='space-y-4 dark:bg-[#17153B] dark:text-white flex bg-white p-4 shadow-lg rounded-lg flex-col w-full'>
                        <h2 className='text-xl'>{personSelected == '1' ? 'Adding student' : 'Adding teacher'}</h2>
                        <Input onChange={(e) => setName(e.target.value)} value={name} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='text' size='large' name='name' placeholder='Enter a name' required />
                        <Input onChange={(e) => setSurname(e.target.value)} value={surname} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='text' size='large' name='surname' placeholder='Enter a surname' required />
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='email' size='large' name='email' placeholder='Enter a email' required />
                        <TextArea onChange={(e) => setBio(e.target.value)} value={bio} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white'
                            name='bio'
                            placeholder="Enter a bio"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                        <Input onChange={(e) => setActivity(e.target.value)} value={activity} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='text' size='large' name='activity' placeholder={personSelected == '1' ? 'Enter hobby or study' : 'Enter a job'} required />
                        <div className='flex items-center justify-end'>
                            <Button type='default' htmlType='submit' size='large' className='px-5 py-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-400 duration-500'>Add</Button>
                        </div>
                    </form>}
            </Modal>
            <Modal openModal={deleteModal} setOpenModal={setDeleteModal}>
                {isLoading ? <img className='absolute inset-0 m-auto' src={LoadingImg} alt='loading img' width={100} height={100} /> :
                    <div className='flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 dark:bg-[#17153B] dark:text-white'>
                        <h2 className='text-xl mb-3'>Are you sure you want to delete this record?</h2>
                        <div className='flex items-center justify-between w-full'>
                            <Button onClick={() => setDeleteModal(false)} type='default' size='large' className='w-[48%]'>Cancel</Button>
                            <Button onClick={handleDeletePerson} type='primary' size='large' className='bg-red-500 w-[48%] text-white hover:!bg-red-400'>Delete</Button>
                        </div>
                    </div>}
            </Modal>
            <Modal openModal={editModal} setOpenModal={setEditModal}>
                {isLoading ? <img className='absolute inset-0 m-auto' src={LoadingImg} alt='loading img' width={100} height={100} /> :
                    <form onSubmit={handleSubmit} autoComplete='off' className='space-y-4 dark:bg-[#17153B] dark:text-white flex bg-white p-4 shadow-lg rounded-lg flex-col w-full'>
                        <h2 className='text-xl'>{showData == '1' ? 'Edit student' : 'Edit teacher'}</h2>
                        <Input onChange={(e) => setName(e.target.value)} value={name} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='text' size='large' name='name' placeholder='Enter a name' required />
                        <Input onChange={(e) => setSurname(e.target.value)} value={surname} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='text' size='large' name='surname' placeholder='Enter a surname' required />
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='email' size='large' name='email' placeholder='Enter a email' required />
                        <TextArea onChange={(e) => setBio(e.target.value)} value={bio} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white'
                            name='bio'
                            placeholder="Enter a bio"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                        <Input onChange={(e) => setActivity(e.target.value)} value={activity} className='text-lg dark:bg-[#17153B] dark:text-white dark:placeholder:text-white' type='text' size='large' name='activity' placeholder={showData == '1' ? 'Enter hobby or study' : 'Enter a job'} required />
                        <div className='flex items-center justify-end'>
                            <Button type='default' htmlType='submit' size='large' className='px-5 py-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-400 duration-500'>Edit</Button>
                        </div>
                    </form>}
            </Modal>


        </>

    )
}

export default School
