import React from 'react'
import { IonApp, IonBadge, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { personCircle, home, cog, statsChart } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home'
import Settings from '../pages/Settings'
import MyPost from '../pages/MyPost';
import Statistics from '../pages/Statistics'

const TabsRoot = () => {
  const user = useSelector(state => state.userReducer)
  if(user.phone == ""){
    return <Redirect to='/login'/>
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect to='/homepage' exact/>
            <Route path='/homepage' component={Home} exact/>
            <Route path='/posts' component={MyPost} exact/>
            <Route path='/settings' component={Settings} exact/>
            <Route path='/statistics' component={Statistics} exact/>
            
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="homepage" href='/homepage'>
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
              {/* <IonBadge>6</IonBadge> */}
            </IonTabButton>
            <IonTabButton tab="posts" href='/posts'>
              <IonIcon icon={personCircle}/>
              <IonLabel>My Posts</IonLabel>
            </IonTabButton>
            {
              user.role == 'admin' ?
              <IonTabButton tab="statistics" href='/statistics'>
                <IonIcon icon={statsChart}/>
                <IonLabel>Statistics</IonLabel>
              </IonTabButton>
              :
              null
            }
            <IonTabButton tab="settings" href='/settings'>
              <IonIcon icon={cog} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default TabsRoot
