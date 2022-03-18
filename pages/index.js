import React from 'react'
import { useRouter } from 'next/router'
import { getAuth, signOut } from "firebase/auth";
import useFirebase from '../lib/useFirebase';
import AddData from '../components/AddData';
import { useEffect } from 'react';
import MyResorts from '../components/MyResorts';

const Index = () => {

  const { user } = useFirebase()

  const router = useRouter()
  const auth = getAuth();

  useEffect(() => {
    if (!user) {
      router.push("/signin")
    } else {
      router.push("/")
    }
  }, [])


  const handleSignout = () => {
    signOut(auth).then(() => {
      router.push("/signin")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      <div className='w-full flex items-center justify-center '>
        <MyResorts />
      </div>
    </div>
  )
}

export default Index