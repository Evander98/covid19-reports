import {
  IonAlert,
  IonApp,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "../supports/firebase";

const Home = () => {
  const user = useSelector((state) => state.userReducer);
  const theme = useSelector(state => state.theme)

  const [getData, setGetData] = useState({});
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    getAllPosts();
  }, [user.phone]);

  const getAllPosts = () => {
    firebase
      .database()
      .ref(`reports/`)
      .get()
      .then((res) => {
        setGetData(res.val());
      })
      .catch(() => {
        setErrorMsg("Server Error");
      });
  };

  const renderPost = () => {
    var posts = Object.keys(getData).map((key, i) => {
      return (
        <IonCard color={theme.darkMode ? "medium" : ""}>
          <center>
            <IonImg src={getData[key].imageUrl} style={{ width: "300px" }} />
          </center>
          <IonCardHeader>
            <IonCardSubtitle>{getData[key].gender}</IonCardSubtitle>
            <IonCardTitle>{getData[key].name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              Victim of Covid-19
            </IonLabel>
            <IonItem color={theme.darkMode ? "medium" : ""}>
              <IonLabel slot='start'>Age</IonLabel>
              <IonText>{getData[key].age}</IonText>
            </IonItem>
            <IonItem color={theme.darkMode ? "medium" : ""}>
              <IonLabel slot='start'>Address</IonLabel>
              <IonText>{getData[key].address}</IonText>
            </IonItem>
            <IonItem color={theme.darkMode ? "medium" : ""}>
              <IonLabel slot='start'>Location</IonLabel>
              <IonText>{getData[key].location}</IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
      );
    });
    return posts;
  };

  if (user.phone == "") {
    return <Redirect to="/login" />;
  }
  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!errorMsg}
        message={errorMsg}
        buttons={[{ text: "Okay", handler: () => setErrorMsg("") }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color={theme.darkMode ? "medium" : "primary"}>
            <IonTitle>Hi, {user.fullName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color={theme.darkMode ? "dark" : "light"}>{renderPost()}</IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default Home;
