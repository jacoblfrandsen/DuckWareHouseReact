import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import DuckForm from '../components/DuckForm'

const EditDuck = () => {
    const [duck, setDuck] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        axios
        .get(`http://localhost:3000/ducks/${id}`)
        .then((response) => {
            setDuck(response.data[0])

        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const handleSaveDuck = (duckData) => {
        axios
            .put(`http://localhost:3000/ducks/${id}`, duckData)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error, duckData)
                alert('Something went Wrong')
            })
      }


  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Edit Duck</h1>
        <DuckForm initialDuck= {duck} onSubmit={handleSaveDuck} />
    </div>

  )
}

export default EditDuck


