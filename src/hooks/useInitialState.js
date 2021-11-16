import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useHistory } from 'react-router';

const useInitialState = () => {
    const auth = getAuth();
    const firestore = getFirestore();

    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);

    const loginUser = (formData) => {
        setLoading(true)
        signInWithEmailAndPassword(auth , formData.email, formData.password)
        .then((userCredential) => {
           
        }).catch((error)=>{
            setLoading(false)
            setError(error.message)
        })
    }

    const signUpUser = (formData) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then( async (userCredential) => {
            await addDoc(collection(firestore, 'usuarios'), formData)
            console.log('register successfull')

        }).catch((error) =>{
            setLoading(false)
            setError(error.message)
        })
    }

    const logOutUser = () => {
        setLoading(true)
        signOut(auth).then(() =>{
            console.log('signout successfull')
        }).catch((error) =>{
            setLoading(false)
            setError(error.message)
        })
    }

    return{
        loginUser,
        signUpUser,
        logOutUser,
        error,
        loading,
    }
};

export default useInitialState;