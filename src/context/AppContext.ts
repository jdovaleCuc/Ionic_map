import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import useGetUsers from "../hooks/useGetUsers";
import { Geolocation } from '@ionic-native/geolocation'

interface Auth {
    loggedIn: Boolean;
    userId?: string;
    userData?: any;
}
interface AuthInit {
    loading: Boolean;
    auth?: Auth;
}

export const AppContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
    console.log("auth used");
    return useContext(AppContext)
}

export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
    const firebaseAuth = getAuth();
    //const db = getFirestore();
    //const { getUserByEmail } = useGetUsers();

    useEffect( () => {
        onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
            const auth = firebaseUser
                ? { loggedIn: true, userId: firebaseUser.uid, userData: firebaseUser }
                : ({ loggedIn: false })
            setAuthInit({ loading: false, auth });
           /* if (auth) {
                const position = await Geolocation.getCurrentPosition();
                const user = await getUserByEmail(auth.userData?.email!)
                setDoc(doc(db, 'usuarios', user.id), {
                    ultimaUbicacion: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            }*/
        });
    }, [])
    return authInit;
}

