import Navbar from '@/components/Navbar'
import React from 'react'
import Login from './sections/Login'

const signin = () => {
  return (
    <div>
    <div className='background'></div>
      <Navbar/>
      <Login/>
    </div>
  )
}

export default signin