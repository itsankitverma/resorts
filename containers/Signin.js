import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { db } from '../lib/firebase-config';
import useFirebase from '../lib/useFirebase'

const Signin = () => {
    const route = useRouter()
    const [details, setDetails] = useState({
        email: "",
        password: "",
    })

    const { email, password } = details
    const auth = getAuth();
    const { login, handleSigninWithGoogle } = useFirebase()
    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const success = () => toast.success('Login successfuk', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    login(user)
                })
            success()
            route.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div><div className=' text-white w-full flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='rounded-lg bg-gray-700 p-10 flex flex-col gap-6 justify-center items-center'>
                <div>
                    <h2 className='text-3xl w-80'> Hey there, Login here</h2>
                </div>
                <div>
                    <input type="text"
                        value={email}
                        onChange={handleChange}
                        placeholder='Email'
                        name="email"
                        id="email"
                        className='outline-none p-2 w-[20rem] bg-gray-700 border-b-2 border-b-gray-200'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        name="password"
                        id="password"
                        className='outline-none p-2 w-[20rem] bg-gray-700 border-b-2 border-b-gray-200'
                    />
                </div>
                <div>
                    <p className='underline cursor-pointer' onClick={() => route.push("/signup")}>Have no account yet?</p>
                </div>
                <div className='flex justify-center gap-7'>
                    <button className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 hover:to-blue-700'
                        onClick={handleSubmit}
                    >Signin</button>
                    <button className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 hover:to-blue-700'>Clear</button>
                </div>
                <p>
                    or
                </p>
                <div className='p-2 cursor-pointer border-2 border-white px-10 rounded-lg bg-white text-black'>
                    <div onClick={handleSigninWithGoogle} className='flex gap-2'>
                        <img className='w-5' src="http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png" alt="" />
                        <p className='font-bold'>
                            Login With Google
                        </p>
                    </div>
                </div>
            </div>
        </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Signin