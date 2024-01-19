import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const DuckForm = ({ initialDuck, onSubmit }) => {
    const [color, setColor] = useState(initialDuck ? initialDuck.color : '');
    const [size, setSize] = useState(initialDuck ? initialDuck.size : '');
    const [price, setPrice] = useState(initialDuck ? initialDuck.price : '');
    const [quantity, setQuantity] = useState(initialDuck ? initialDuck.quantity : '');

    

    useEffect(() => {
        if (initialDuck) {
            setColor(initialDuck.color);
            setSize(initialDuck.size);
            setPrice(initialDuck.price);
            setQuantity(initialDuck.quantity);
        }
    }, [initialDuck]);

    const isDisabled = initialDuck != null; // Disable if initialDuck is provided

    const handleSubmit = () => {
        const duckData = { color, size, price, quantity };
        onSubmit(duckData);
    };


  return (
    <div>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Color</label>
                <select disabled={isDisabled} value={color} onChange={(e) => setColor(e.target.value)}  id="sizes" className='border-2 border-gray-500 px-4 py-2  w-full ' >
                    <option value="">Select</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                </select>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Size</label>
                <select disabled={isDisabled} value={size}onChange={(e) => setSize(e.target.value)}  id="colours" className='border-2 border-gray-500 px-4 py-2  w-full ' >
                    <option value="">Select</option>
                    <option value="XLarge">XLarge</option>
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                    <option value="XSmall">XSmall</option>
                </select>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Price</label>
                <input
                    type='number'
                    step="0.01"
                    min='0'
                    value={price}
                    onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value)))}
                    className='border-2 border-gray-500 px-4 py-2  w-full '
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Quantity</label>
                <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value)))}
                    className='border-2 border-gray-500 px-4 py-2  w-full '
                />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit}>
                Save
            </button>
        </div>
    </div>
  );
};

export default DuckForm;