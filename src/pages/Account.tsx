import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonRow } from '@ionic/react';
import { chevronForward, compassSharp, exitSharp, personSharp, settingsSharp, syncCircleSharp } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import '../theme/Account.css'
import logoAvatar from '../assets/avatardefault_92824.png'
import { useHistory } from 'react-router';
import useInitialState from '../hooks/useInitialState';
import { AppContext } from '../context/AppContext';
import { collection, DocumentData, getDocs, getFirestore, query, where } from "@firebase/firestore";

const Account: React.FC = () => {

    const { userData } = useContext(AppContext)
    const [userOption, setUserOption] = useState<DocumentData>();

    const { logOutUser, loading } = useInitialState();
    const history = useHistory();
    
    useEffect( () => {
        const db = getFirestore();
        const ref = collection(db, 'usuarios');
        const user = query(ref, where('email', '==', userData.email));
        const querySnapshot = getDocs(user).then(
            (document) => {
                document.forEach((doc) => {
                    setUserOption(doc.data())
                })
            }
        );
    }, [])

    if (loading) {
        return(
            <IonLoading isOpen message="...Espere" />
        )
    }
    
    const handleSubmit = (button: String) => {
        logOutUser();
        if (button === 'cambiar_cuenta') {
            history.push('/login');
        } else if (button === 'salir') {
            history.push('/welcome');
        }

    }
    
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid className="top">
                    <IonRow >
                        <IonCol size='12' >
                            <IonAvatar className="user-avatar">
                                <img
                                    src={logoAvatar}
                                    alt="avatar" />
                            </IonAvatar>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonCard className="menu-content">
                    <IonCardHeader className="ion-text-center ion-no-padding cardheader" >
                        <IonLabel >
                            <div style={{ marginTop: '50px' }}>
                                <h1 className="ion-text-capitalize" style={{ color: 'black', fontWeight: 'bold' }}>{userOption && userOption.name + ' ' + userOption.lastname }</h1>
                                <h2>{userData.email}</h2>
                            </div>
                        </IonLabel>
                    </IonCardHeader>
                    <IonItemDivider />
                    <IonCardContent className='cardContent' >
                        <IonList lines="none">
                            <IonItem button={true} >
                                <IonIcon slot="start" icon={settingsSharp} />
                                <IonLabel style={{ paddingRigth: '5px' }} >
                                    <h2 >Ajustes</h2>
                                </IonLabel>
                                <IonIcon slot="end" icon={chevronForward} />
                            </IonItem>
                            <IonItem button={true}>
                                <IonIcon slot="start" icon={personSharp} />
                                <IonLabel>
                                    <h2>Cuenta</h2>
                                </IonLabel>
                                <IonIcon slot="end" icon={chevronForward} />
                            </IonItem >
                            <IonItem button={true}>
                                <IonIcon slot="start" icon={compassSharp} />
                                <IonLabel>
                                    <h2>Sitios Recientes</h2>
                                </IonLabel>
                                <IonIcon slot="end" icon={chevronForward} />
                            </IonItem>
                            <IonItem
                                button={true}
                                onClick={() => handleSubmit('cambiar_cuenta')}
                            >
                                <IonIcon slot="start" icon={syncCircleSharp} />
                                <IonLabel>
                                    <h2>Cambiar Cuenta</h2>
                                </IonLabel>
                                <IonIcon slot="end" icon={chevronForward} />
                            </IonItem>
                            <IonItem
                                button={true}
                                onClick={() => handleSubmit('salir')}
                            >
                                <IonIcon slot="start" icon={exitSharp} />
                                <IonLabel>
                                    <h2>Salir</h2>
                                </IonLabel>
                                <IonIcon slot="end" icon={chevronForward} />
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Account;