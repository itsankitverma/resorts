import React from 'react'
import { useRouter } from 'next/router'
import { getAuth, signOut } from "firebase/auth";
import useFirebase from '../lib/useFirebase';
import ProfileHeader from '../components/ProfileHeader';
import ManageMyResorts from '../containers/ManageMyResorts';
import Settings from '../containers/Settings';
import MyResorts from '../components/MyResorts';
import { useEffect } from 'react';
import { useState } from 'react';

const Profile = () => {
    const [addResort, setAddResort] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [settings, setSettings] = useState(false)

    const { user } = useFirebase()

    const router = useRouter()
    const auth = getAuth();

    const handleSignout = () => {
        signOut(auth).then(() => {
            router.push("/signin")
        }).catch((error) => {
        });
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            {user &&
                <div className='w-full flex items-center justify-center flex-col'>
                    <ProfileHeader user={user}
                        addResort={addResort} setAddResort={setAddResort}
                        editProfile={editProfile} setEditProfile={setEditProfile}
                        settings={settings} setSettings={setSettings}
                    />
                </div>
            }
            {/* <ManageMyResorts handleSignout={handleSignout} /> */}
            {addResort && <MyResorts />}
            {settings && <Settings handleSignout={handleSignout} user={user} />}
        </div>
    )
}

export default Profile