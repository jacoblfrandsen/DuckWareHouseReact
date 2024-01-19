import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineEdit} from 'react-icons/ai'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'


const Inventory = () => {
    const [ducks, setDucks] = useState([])
    useEffect(()=> {
        axios
        .get('http://localhost:3000/ducks')
        .then((response) => {
            setDucks(response.data.data)

        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const handleDelete = async (duckToDelete) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this duck?");
        if (isConfirmed){
            try {
                await axios.delete(`http://localhost:3000/ducks/delete/${duckToDelete._id}`);
                setDucks(ducks.filter(duck => duck._id !== duckToDelete._id));
            } catch (error) {
                console.error('Error deleting duck:', error);
            }
        }
       
    };

    return (

        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Duck WareHouse</h1>
                <Link to='/ducks/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
                <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>Id</th>
                    <th className='border border-slate-600 rounded-md'>Color</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>
                        Size
                    </th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>
                        Price
                    </th>
                    <th className='border border-slate-600 rounded-md'>Quantity</th>
                    <th className='border border-slate-600 rounded-md'>Action</th>
                </tr>
                
                
            </thead>
            <tbody>
                {ducks.map((duck, index) => (
                <tr key={duck._id} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>
                        {duck._id}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                        {duck.color}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                        {duck.size}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                        {duck.price}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                        {duck.quantity}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                        <div className='flex justify-center gap-x-4'>
                            <Link to={`/ducks/edit/${duck._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                            </Link>
                            <MdOutlineDelete className='text-2xl text-red-600' onClick={() => handleDelete(duck)}/>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default Inventory
