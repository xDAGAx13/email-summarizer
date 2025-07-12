import { onAuthStateChanged } from 'firebase/auth'
import { Tagline } from '../info'
import React, { useEffect, useState } from 'react'
import auth from '../app/firebase'
import DatePicker from 'react-datepicker'
import Form from '../utils/Form'

const Main = () => {
  const [name, setName] = useState('')

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        const name = user.displayName
        const firstname = name.split(' ',1)[0];
        setName(firstname)        
      }
    })
    return ()=>unsubscribe();
  },[])
  return (
    <div className='w-auto mx-10 flex items-center flex-col'>
      <div className='mb-10'>
      <h1 className='text-3xl lg:text-5xl  font-bold text-neutral-400 text-center mb-5'>Welcome to EMSum{name?`, ${name}`:''}</h1>
      <p className='text-2xl text-center font-semibold text-neutral-500 '>{Tagline}</p>
      </div>
      <Form/>
    </div>
  )
}

export default Main