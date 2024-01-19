import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import DuckForm from '../components/DuckForm'


const CreateDuck = () => {
  const navigate = useNavigate()
  const handleSaveDuck = (duckData) => {
    axios
        .post('http://localhost:3000/ducks', duckData)
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
      <h1 className='text-3xl my-4'>Create Duck</h1>
      <DuckForm onSubmit={handleSaveDuck} />
    </div>
  )
}

export default CreateDuck
