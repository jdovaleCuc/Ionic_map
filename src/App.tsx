import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './containers/Signup';
import { AppContext, useAuthInit } from './context/AppContext';
import Home from './pages/Home';


const App: React.FC = () => {

  const { loading, auth } = useAuthInit();

  if (loading) {
    return (<IonLoading isOpen translucent />)
  }
  if (auth) {
    console.log("Logged in", auth)
  }

  return (
    <AppContext.Provider value={auth!}>
      <IonApp>
        {auth?.loggedIn ? (
          <Home />
        ) : (
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/welcome" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/">
                <Redirect to="/welcome" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        )}
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
