import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useAxios(path, method, ) {
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

    const deleteData = async (id) => {
        await axios.delete(`http://localhost:3000${path}/${id}`);
        setData(prevData => prevData.filter(item => item.id!== id));
      };

      return { data, postData, deleteData };
    }

export default useAxios
