import axios from 'axios'
import { useEffect, useState } from 'react'

function useAxios(path) {
    const [data, setData] = useState([])
    useEffect(() => {
        async function GetData(){
            const res= await axios.get(`http://localhost:3000${path}`)
            setData(res.data)
        }
        GetData()
    }, [path])

    const postData = async (payload) => {
        const res = await axios.post(`http://localhost:3000${path}`, payload);
        setData(prevData => [...prevData, res.data]);
        return res.data;
      };
      const EditData = async (id,payload) => {
        const res = await axios.put(`http://localhost:3000${path}/${id}`, payload);
        setData(prevData => prevData.map(item => item.id === id ? res.data : item));
        return res.data;
      };

    const deleteData = async (id) => {
        await axios.delete(`http://localhost:3000${path}/${id}`);
        setData(prevData => prevData.filter(item => item.id!== id));
      };
      return { data, postData, deleteData, EditData };
    }

export default useAxios
