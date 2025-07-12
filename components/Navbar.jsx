'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '../app/firebase'

const Navbar = () => {
  const router = useRouter();
  const [name, setName] = useState(false);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
      if(user){
        const name = user.displayName;
        const firstName = name.split(' ')[0]
        setName(firstName);
      }
    })
    return ()=>unsub()
  },[])

  return (
    <nav className='flex justify-between px-5 lg:px-20 py-5 mb-10'>
      <div className='flex gap-3'>
      <h1 className='nav-item' onClick={()=>router.push('/')}>EM-Sum</h1>
      {name&&<h1 className='nav-item' onClick={()=>router.push('/')}>{name}</h1>}
      </div>
      <ul className='flex flex-row gap-3'>
        <li className='nav-item'>Git Image</li>
        <li className='nav-item' ><Link href="/auth">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar