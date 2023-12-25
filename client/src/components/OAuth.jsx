import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from '@firebase/auth';
import {app} from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

// FIREBASE SETUP
// INSTALL NPM IN CLIENT FILE
// CREATE A FIREBASE.JS FILE IN CLIENT
// PASTE THE CONFIG FROM FIREBASE WEBSITE
// SETUP SPECIAL ENV FILE IN CLIENT WITH VITE
// GO TO CONSOLE ON FIREBASE
// AUTHENTICATION - Providers - Google
// Enable Providers you want
// Then in OAuth you add provider and getAuth

// below we change the button type from default SUBMIT, to BUTTON, so its data doesnt get pushed through in the form
export default function OAuth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            // if you dont have 2 gmail accounts, you wont see the Popup window
            const result = await signInWithPopup(auth, provider)

            // i dont know where this endpoint is - i now know, we created it in the AUTH.route.js file
            const res = await fetch ('/api/auth/google', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            })
            const data = await res.json()
            dispatch(signInSuccess(data));
                } catch (error) {
            console.log('could not sign in with Google', error)
        }
    };

  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Continue with Google</button>
  )
;}
