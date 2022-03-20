/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai';

const ProfileHeader = (props) => {
    return (
        <div className='w-full flex md:flex-row flex-col justify-evenly py-5 items-center md:gap-20 gap-5'>
            <div className='flex items-center '>
                <div className='flex flex-col md:flex-row items-center gap-3 text-center'>
                    <img className='rounded-full' src={props.user.photoURL} alt={props.user.displayName} />
                    <div>
                        <p className='text-2xl font-bold'>{props.user.displayName}</p>
                        <div className='text-base'>{props.user.email}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:gap-5 gap-2 items-center'>
                <button onClick={() => { props.setAddResort(!props.addResort); props.setEditProfile(false); props.setSettings(false) }} className='px-3 py-2 bg-indigo-600 text-white rounded-lg w-40'>Add your Resort</button>
                <button onClick={() => { props.setAddResort(false); props.setEditProfile(!props.editProfile); props.setSettings(false) }} className='px-3 py-2 bg-indigo-600 text-white rounded-lg w-40'> Edit Profile</button>
                <AiOutlineSetting className='text-3xl cursor-pointer absolute top-16 right-3 md:relative md:top-0 md:right-0 ' onClick={() => { props.setAddResort(false); props.setEditProfile(false); props.setSettings(!props.settings) }} />
            </div>
        </div>
    )
}

export default ProfileHeader