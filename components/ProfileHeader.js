import React from 'react'

const ProfileHeader = ({ user }) => {
    console.log(user);
    return (
        <div className='w-full flex md:flex-row flex-col justify-evenly py-5 items-center md:gap-20 gap-5'>
            <div className='flex items-center '>
                <div className='flex flex-col md:flex-row items-center gap-3 text-center'>
                    <img className='rounded-full' src={user.photoURL} alt={user.displayName} />
                    <div>
                        <p className='text-2xl font-bold'>{user.displayName}</p>
                        <div className='text-base'>{user.email}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:gap-5 gap-2'>
                <button className='px-3 py-2 bg-indigo-600 text-white rounded-lg'>Add your Resort</button>
                <button className='px-3 py-2 bg-indigo-600 text-white rounded-lg'>Edit Profile</button>
            </div>
        </div>
    )
}

export default ProfileHeader