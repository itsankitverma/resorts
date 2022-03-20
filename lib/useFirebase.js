import { useState } from "react";
import { auth } from "./firebase-config";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const useFirebase = () => {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const route = useRouter()

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = (users) => {
    setUser(users);
  }

  const handleSigninWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        route.push('/')
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return {
    user,
    login,
    handleSigninWithGoogle
  };
};

export default useFirebase;