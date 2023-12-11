import React from "react";
import {auth, provider} from "../../config/firebase-config";
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {

  const navigate = useNavigate();


  const signInWithGoogle = async() => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem("auth", JSON.stringify(authInfo))
    navigate("/expense-tracker");

  }
  return (
    <div class="px-6 sm:px-0 max-w-sm">
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={signInWithGoogle}
      >
        Sign in with google
      </button>
    </div>
  );
};
