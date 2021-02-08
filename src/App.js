import React from 'react'

import './App.css'

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

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx';
import TabsRoot from './components/TabsRoot.jsx'

function App() {
  return (
    <IonApp className="app">
      <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/home' component={TabsRoot} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/register' component={Register} exact/>
            <Redirect to='/home' exact/>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
