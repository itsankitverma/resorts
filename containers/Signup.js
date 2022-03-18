import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { db } from '../lib/firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useFirebase from '../lib/useFirebase';

const Signup = () => {

    const { handleSigninWithGoogle } = useFirebase()
    const route = useRouter()
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const { username, confirmPassword, email, password } = details
    const auth = getAuth();
    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const failed = () => toast.info('Password Does not Match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const passwordLength = () => toast.info('Add 8 charecters in password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const success = () => toast.success('Regsitered Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleSubmit = async () => {
        if (password.length < 8) {
            passwordLength()
        } else {
            if (password === confirmPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            userCredential.user.displayName = username
                            console.log(user);
                            login(user)
                            // ...
                        })
                } catch (error) {
                    console.log(error);
                }
                success()
                setDetails({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            } else {
                failed()
            }
        }
    }

    return (
        <div>
            <div className=' text-white w-full flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
                <div className='rounded-lg bg-gray-700 p-10 flex flex-col gap-6 justify-center items-center'>
                    <div>
                        <h2 className='text-3xl w-80'> Get on board...</h2>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={handleChange}
                            placeholder='Username'
                            name="username"
                            className='outline-none p-2 w-[20rem] bg-gray-700 border-b-2 border-b-gray-200'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={email}
                            onChange={handleChange}
                            placeholder='Email'
                            name="email"
                            className='outline-none p-2 w-[20rem] bg-gray-700 border-b-2 border-b-gray-200' />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            name="password"
                            className='outline-none p-2 w-[20rem] bg-gray-700 border-b-2 border-b-gray-200' />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className='outline-none p-2 w-[20rem] bg-gray-700 border-b-2 border-b-gray-200' />
                    </div>
                    <div>
                        <p className='underline cursor-pointer' onClick={() => route.push("/signin")}>Already registered? click here</p>
                    </div>
                    <div className='flex justify-center gap-7'>
                        <button onClick={handleSubmit} className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 hover:to-blue-700'>Signup</button>
                        <button className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 hover:to-blue-700'>Clear</button>
                    </div>
                    <p>
                        or
                    </p>
                    <div className='p-2 cursor-pointer border-2 border-white px-10 rounded-lg bg-white text-black'>
                        <div onClick={handleSigninWithGoogle} className='flex gap-2'>
                            <img className='w-5' src="http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png" alt="" />
                            <p className='font-bold'>
                                Signup With Google
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

export default Signup