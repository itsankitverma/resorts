import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { db } from '../lib/firebase-config';
import { doc, setDoc } from "firebase/firestore";

const AddData = (props) => {
    // console.log(props.uid);
    const route = useRouter()
    const [details, setDetails] = useState({
        email: "",
        password: "",
    })

    const { email, password } = details

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

  

    const handleSubmit = async () => {
        try {
            await setDoc(doc(db, `users/${props.uid}`), {
                email: details.email,
                password: details.password,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div><div className=' text-white w-full flex items-center justify-center h-screen'>
            <div className='rounded-lg bg-gray-700 p-10 flex flex-col gap-6 justify-center items-center'>
                <div>
                    <h2 className='text-3xl w-80'> Hey there...{props.uid}</h2>
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
                    >AddData</button>
                    <button className='rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 hover:to-blue-700'>Clear</button>
                    <button className='rounded-lg bg-gradient-to-r ' onClick={props.handleSignout}>Logout</button>
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

export default AddData