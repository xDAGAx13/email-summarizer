'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className='flex justify-between px-5 lg:px-20 py-5 mb-10'>
      <h1 className='nav-item' onClick={()=>router.push('/')}>EM-Sum</h1>
      <ul className='flex flex-row gap-3'>
        <li className='nav-item'>Git Image</li>
        <li className='nav-item' ><Link href="/auth">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar