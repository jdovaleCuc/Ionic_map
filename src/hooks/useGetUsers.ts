import React, { useEffect, useState } from 'react';
import { collection, DocumentData, getFirestore, onSnapshot, getDocs ,  where, query } from "@firebase/firestore";

const useGetUsers = () => {

    const [Users, setUsers] = useState<Array<DocumentData>>([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();

    useEffect(() => {
        onSnapshot(collection(db, 'usuarios'), (query) => {
            const data: Array<DocumentData> = []
            query.forEach(doc => {
                data.push({ ...doc.data(), key: doc.id });
            })
            setUsers(data);
            setLoading(false)
        });
    }, [])

    const getUserByEmail = (email: String) => {
        const data : Array<DocumentData> = []
        const ref = collection(db, 'usuarios');
        const user =  query(ref, where('email', '==', email));
        const querySnapshot = getDocs(user).then(
            (document) => {
                document.forEach((doc) => {
                    data.push({...doc.data() , id: doc.id});
                })
            }
        );
        console.log(data)
       return data
    }

    return{
        loading,
        Users,
        getUserByEmail,
    }
};

export default useGetUsers;