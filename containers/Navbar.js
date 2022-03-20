/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = ({ user }) => {
  const router = useRouter()
  return (
    <div className='w-full flex md:justify-evenly justify-between h-14 bg-gray-700 items-center text-white gap-20 px-8 md:px-0 sticky top-0'>
      <p onClick={() => router.push('/')} className='font-bold cursor-pointer hidden md:block'>The Heaven</p>
      <p onClick={() => router.push('/')} className='font-bold cursor-pointer block md:hidden'>TH</p>
      {user ?
        <div className='flex md:gap-10 gap-3 items-center '>
          <p className='cursor-pointer hidden md:block'>Become a host</p>
          <button onClick={() => router.push('/profile')}>Hi, {user.displayName}</button>
          <img onClick={() => router.push('/profile')} src={user.photoURL} className="w-7 rounded-full cursor-pointer" alt="" />
        </div> :
        <div className='flex gap-5'>
          <p>Become a host</p>
          <button onClick={() => router.push('/signin')}>Login</button>
        </div>
      }
    </div>
  )
}

export default Navbar