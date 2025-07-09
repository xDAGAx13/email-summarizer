import { Tagline } from '../info'
import React from 'react'

const Main = () => {
  return (
    <div className=''>
      <h1 className='text-5xl font-bold text-neutral-400 text-center mb-5'>Welcome to EMSum</h1>
      <p className='text-2xl text-center font-semibold text-neutral-500 '>{Tagline}</p>
    </div>
  )
}

export default Main