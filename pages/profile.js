import React from 'react'
import { useRouter } from 'next/router'
import { getAuth, signOut } from "firebase/auth";
import useFirebase from '../lib/useFirebase';
import ProfileHeader from '../components/ProfileHeader';
import ManageMyResorts from '../containers/ManageMyResorts';
import MyResorts from '../components/MyResorts';

const Profile = () => {

    const { user } = useFirebase()

    const router = useRouter()
    const auth = getAuth();

    const handleSignout = () => {
        signOut(auth).then(() => {
            router.push("/signin")
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            {user &&
                <div className='w-full flex items-center justify-center flex-col'>
                    <ProfileHeader user={user} />
                    {/* <ManageMyResorts handleSignout={handleSignout} /> */}
                </div>
            }
            <MyResorts />
        </div>
    )
}

export default Profile