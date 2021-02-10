import React, { useRef } from "react";
import {
  IonAlert,
  IonApp,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import firebase from "../supports/firebase";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notFound, serverError, setError, loggedIn } from "../actions";

const Login = () => {
  const phoneRef = useRef();
  const passwordRef = useRef();
  const user = useSelector((state) => state.userReducer);
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch();

  const onLoginClick = () => {
    if (phoneRef.current.value && passwordRef.current.value) {
      var phone = phoneRef.current.value;
      var password = passwordRef.current.value;
      firebase
        .database()
        .ref("users/")
        .get().then((res) => {
          if (Object.keys(res.val()).includes(phone)) {
            firebase
              .database()
              .ref(`users/${phone}`)
              .get()
              .then((res2) => {
                // console.log(res2.val().fullName)
                if(res2.val().password === password){
                  dispatch(loggedIn(res2.val().phone, res2.val().fullName, res2.val().password, res2.val().role))
                }else{
                  dispatch(notFound())
                }
              }).catch(() => {
                dispatch(serverError())
              })
            // console.log(Object.keys(res.val()).indexOf(phone))
          } else {
            dispatch(notFound());
          }
        })
        .catch(() => {
          dispatch(serverError())
        })
    } else {
      dispatch(setError("Please fill all the input forms!"))
    }
  };

  if(user.phone){
    return <Redirect to='/'/>
  }

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!user.error}
        message={user.error}
        buttons={[{ text: "Okay", handler: () => dispatch(setError("")) }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color={theme.darkMode ? "medium" : "primary"}>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"color={theme.darkMode ? "dark" : ""}>
          <IonGrid className="ion-margin-top">
            <IonRow>
              <IonCol>
                <IonItem color={theme.darkMode ? "dark" : ""}>
                  <IonLabel position="floating">Phone Number</IonLabel>
                  <IonInput type="number" ref={phoneRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem color={theme.darkMode ? "dark" : ""}>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput type="password" ref={passwordRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  onClick={onLoginClick}
                  color={theme.darkMode ? "medium" : ""}
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-margin">
                  <p style={{ textAlign: "center" }}>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default Login;
