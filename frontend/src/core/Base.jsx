import React from 'react'
import Navbar from '../components/Navbar'

const Base = ({child}) => {
  return (
    <div className='h-screen w-screen'>
        <Navbar />
        <div>
        {child}
        </div>
    </div>
  )
}

export default Base