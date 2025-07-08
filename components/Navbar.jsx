'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className='flex justify-between px-5 lg:px-20 py-5 mb-10'>
      <h1 className='nav-item'>EM-Sum</h1>
      <ul className='flex flex-row gap-3'>
        <li className='nav-item'>Git Image</li>
        <li className='nav-item' onClick={()=>router.push('Auth')}>Login</li>
      </ul>
    </nav>
  )
}

export default Navbar