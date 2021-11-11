import { IonAvatar, IonButton, IonButtons, IonChip, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, happySharp, sendSharp } from 'ionicons/icons';
import { getFirestore, collection, addDoc, onSnapshot, DocumentData, query, where, Timestamp, orderBy } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

interface chatModal {
    showChat: boolean;
    setShowChat: any;
    toUser: any;
}

interface Message {
    from: String,
    to: String,
    message: string,
    date: Timestamp
}

const ChatModal: React.FC<chatModal> = ({ showChat, setShowChat, toUser }) => {

    const { userData } = useContext(AppContext);
    const db = getFirestore();
    const [messages, setMessages] = useState<DocumentData>([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        getMessages();
        
    }, [])

    const handleMessage = () => {
        SendMessage({
            from: userData.email,
            to: toUser.email,
            message: message,
            date: Timestamp.now()
        })
        setMessage('');
    }

    const SendMessage = async (message: Message) => {
        await addDoc(collection(db, 'mensajes'), message)
        .catch((error) => {
            console.log(error);
        });
    }

    const getMessages =  () => {
        const ref = collection(db, 'mensajes')
        const querydata = query(ref, where('from', 'in', [toUser.email, userData.email]),
                                    orderBy('date', 'asc'));
        onSnapshot(querydata, (queryDocs) => {
            const data: Array<DocumentData> = []
            queryDocs.forEach(doc => {
                data.push({ ...doc.data(), key: doc.id });
            })
            setMessages(data)
            console.log('mensajes' , data)
        })
    }

    return (
        <IonContent id="main">
            <IonModal isOpen={showChat} >
                <IonHeader>
                    <IonToolbar color="secondary">
                        <IonButtons slot="start" >
                            <IonButton onClick={() => setShowChat(false)}>
                                <IonIcon icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonAvatar slot="start" style={{ width: '35px', height: '35px' }}>
                            <img src="http://pm1.narvii.com/6513/891d31199d907db135932627c04bd737977ffc69_00.jpg" />
                        </IonAvatar>
                        <IonTitle className="ion-text-capitalize" style={{ padding: '10px' }}>
                            {toUser.name + ' ' + toUser.lastname}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent id="messages-content">
                    {messages.map((message: DocumentData) => {
                        if (message.from == userData.email && message.to == toUser.email) {
                            return (
                                <IonItem lines="none" key={message.key}>
                                    <IonChip slot="end" color="success">{message.message}</IonChip>
                                </IonItem>
                            )
                        } else if (message.from == toUser.email && message.to == userData.email)  {
                            return (
                                <IonItem lines="none" key={message.key}>
                                    <IonChip slot="start">{message.message}</IonChip>
                                </IonItem>
                            )
                        }
                    })}
                </IonContent>
                <IonFooter>
                    <IonToolbar>
                        <IonItem lines="none">
                            <IonIcon
                                slot="end"
                                icon={sendSharp}
                                onClick={() => handleMessage()}
                                color="primary" />
                            <IonInput
                                type="text"
                                value={message}
                                onIonChange={(e) => setMessage(e.detail.value!)}
                                name="message"
                                placeholder="mensaje" />
                            <IonIcon slot="start" icon={happySharp} color="primary" />
                        </IonItem>
                    </IonToolbar>
                </IonFooter>
            </IonModal>
        </IonContent>
    );
};

export default ChatModal;