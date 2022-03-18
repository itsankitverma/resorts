import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Navbar from '../containers/Navbar'
import { useEffect } from 'react';
import useFirebase from '../lib/useFirebase';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {

  const { user } = useFirebase()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push("/signin")
    } else {
      router.push("/")
    }
  }, [])
  return (
    <>
      <RecoilRoot>
        <Navbar user={user} />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
