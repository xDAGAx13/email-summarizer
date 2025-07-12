'use client'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='bg-transparent'>
      <div className="background"></div>
      <Navbar/>
      <Main/>
      <p></p>
    </div>
  )
}

export default page