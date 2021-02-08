import React from 'react'
import { IonApp, IonButton } from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../actions'
import firebase from '../supports/firebase'
import { Redirect } from 'react-router-dom'

const Settings = () => {
  const user = useSelector((state) => state.userReducer);
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
      {/* <IonButton color='primary' onClick={notifHandler}>notification</IonButton> */}
      <IonButton color='primary' onClick={() => dispatch(reset())}>Log Out</IonButton>
    </IonApp>
  )
}

export default Settings
