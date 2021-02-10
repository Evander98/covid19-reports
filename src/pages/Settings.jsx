import React from 'react'
import { IonApp, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToggle, IonToolbar } from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../actions'
import firebase from '../supports/firebase'
import { Redirect } from 'react-router-dom'
import { setTheme } from '../actions'

const Settings = () => {
  const user = useSelector((state) => state.userReducer);
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const notifHandler = () => {
    const messaging = firebase.messaging()
    messaging.requestPermission().then(() => {
      return messaging.getToken()
    }).then(token => {
      console.log('Token: ', token)
    }).catch(() => {
      console.log("error")
    })
  }

  if (user.phone == "") {
    return <Redirect to="/login" />;
  }
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color={theme.darkMode ? "medium" : "primary"}>
          <IonTitle>
            Settings
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color={theme.darkMode ? "dark" : "light"}>
        {/* <IonButton color='primary' onClick={notifHandler}>notification</IonButton> */}
        <IonItem color={theme.darkMode ? "dark" : "light"}>
          <IonToggle color="success" checked={theme.darkMode} onIonChange={e => dispatch(setTheme(e.detail.checked))} slot="start"/>
          <IonLabel>Dark Mode</IonLabel>
        </IonItem>
        <IonButton color={theme.darkMode ? "medium" : "primary"} onClick={() => dispatch(reset())}>Log Out</IonButton>
      </IonContent>
    </IonApp>
  )
}

export default Settings
