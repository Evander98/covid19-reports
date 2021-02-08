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
import { Link, Redirect } from "react-router-dom";
import firebase from "../supports/firebase";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn, serverError, notAvailable, setError } from "../actions";

const Register = () => {
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const user = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const onRegisterClick = () => {
    if (
      fullNameRef.current.value &&
      phoneRef.current.value &&
      passwordRef.current.value
    ) {
      var data = {
        phone: phoneRef.current.value,
        fullName: fullNameRef.current.value,
        password: passwordRef.current.value,
        role: "user",
      };
      firebase
        .database()
        .ref("users/")
        .get()
        .then((res) => {
          if (Object.keys(res.val()).includes(data.phone)) {
            dispatch(notAvailable());
          } else {
            firebase
              .database()
              .ref(`users/${data.phone}`)
              .set(data, (error) => {
                if (error) {
                  dispatch(serverError());
                } else {
                  dispatch(
                    loggedIn(
                      phoneRef.current.value,
                      fullNameRef.current.value,
                      passwordRef.current.value,
                      'user'
                    )
                  );
                }
              });
          }
        })
        .catch((err) => {
          dispatch(serverError());
        });
    } else {
      dispatch(setError("Please fill in all the input forms!"))
    }
  };

  if (user.phone !== "") {
    return <Redirect to="/" />;
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
          <IonToolbar color="primary">
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid className="ion-margin-top">
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Full Name</IonLabel>
                  <IonInput type="text" ref={fullNameRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Phone Number</IonLabel>
                  <IonInput type="number" ref={phoneRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
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
                  onClick={onRegisterClick}
                >
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="ion-margin">
                  <p style={{ textAlign: "center" }}>
                    Already have an account? <Link to="/login">Login</Link>
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

export default Register;
