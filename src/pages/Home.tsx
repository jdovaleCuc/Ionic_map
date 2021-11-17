import { IonIcon, IonTabs, IonRouterOutlet, IonTabButton, IonTabBar, IonLabel } from '@ionic/react';
import { map, chatbubbleEllipsesOutline, personCircleSharp } from "ionicons/icons"
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Map from './Map';
import Chat from './Chat';
import Account from './Account';

const Home: React.FC = () => {
  
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/map" render={() => <Map />} />
          <Route exact path="/chat" render={() => <Chat />} />
          <Route exact path="/account"  render={() => <Account />} />
          <Route exact path="/">
            <Redirect to="/map" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/map">
            <IonIcon icon={map} />
            <IonLabel>Mapa</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/chat">
            <IonIcon icon={chatbubbleEllipsesOutline} />
            <IonLabel>Chat</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/account">
            <IonIcon icon={personCircleSharp} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;
