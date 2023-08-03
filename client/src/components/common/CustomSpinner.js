import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import './CustomSpinner.css'

function CustomSpinner({msg="Loading..."}) {
  return (
    <div className='spinner-component'>
        <div className='spinner-wrapper'>
            <FaSpinner className="spinner" />
            <div>{msg}</div>
        </div>
    </div>
  )
}

export default CustomSpinner