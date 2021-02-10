import React, { useState, useRef, useEffect } from "react";
import {
  IonAlert,
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ImgAdd from "../images/add.svg";
import firebase, { storage } from "../supports/firebase";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { create, trash } from 'ionicons/icons';


const MyPost = () => {
  const [getData, setGetData] = useState({});
  const [modal, setModal] = useState(false);
  const [genderInput, setGenderInput] = useState("Male");
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState();

  const nameRef = useRef();
  const ageRef = useRef();
  const addressRef = useRef();
  const locationRef = useRef();

  const user = useSelector((state) => state.userReducer);
  const theme = useSelector(state => state.theme)

  useEffect(() => {
    getMyPosts();
  }, [user.phone]);

  const getMyPosts = () => {
    firebase
      .database()
      .ref(`reports/`)
      .get()
      .then((res) => {
        setGetData(res.val());
      })
      .catch((err) => {
        setErrorMsg("Server Error");
      });
  };

  // -------------------------------------------------------UPLOAD SECTION-----------------------------------------------------
  const handleOnChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (
      nameRef.current.value &&
      ageRef.current.value &&
      addressRef.current.value &&
      image &&
      locationRef.current.value
    ) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setErrorMsg("Server Error");
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              var data = {
                name: nameRef.current.value,
                age: ageRef.current.value,
                address: addressRef.current.value,
                imageUrl: url,
                gender: genderInput,
                location : locationRef.current.value,
                createdBy: user.phone,
              };
              firebase
                .database()
                .ref(`reports/${data.name}`)
                .set(data, (error) => {
                  if (error) {
                    setErrorMsg("Server Error");
                  } else {
                    getMyPosts();
                    nameRef.current.value = ""
                    ageRef.current.value = ""
                    addressRef.current.value = ""
                    setImage("")
                    locationRef.current.value = ""
                    setErrorMsg("Success to add victim!")
                    setModal(!modal)
                  }
                });
            });
        }
      );
    } else {
      setErrorMsg("Please fill in all the forms!");
    }
  };
  // -------------------------------------------------------END OF UPLOAD SECTION-----------------------------------------------------

  // ------------------------------------------------------------EDIT SECTION---------------------------------------------------------
  const [editModal, setEditModal] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [editGenderInput, setEditGenderInput] = useState("Male");
  const [editName, setEditName] = useState({})

  const [editAge, setEditAge] = useState();
  const [editAddress, setEditAddress] = useState();
  const [editLocation, setEditLocation] = useState();

  const editHandler = (data) => {
    setEditModal(!editModal)

    setEditName(data.name)
    setEditAge(data.age)
    setEditAddress(data.address)
    setEditGenderInput(data.gender)
    setEditLocation(data.location)
  }

  const handleOnEditChange = (e) => {
    if (e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  const handleEditUpload = () => {
    if (
      editName &&
      editAge &&
      editAddress &&
      editImage &&
      editLocation
    ) {
      const uploadTask = storage.ref(`images/${editImage.name}`).put(editImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setErrorMsg("Server Error");
        },
        () => {
          storage
            .ref("images")
            .child(editImage.name)
            .getDownloadURL()
            .then((url) => {
              var data = {
                name: editName,
                age: editAge,
                address: editAddress,
                imageUrl: url,
                gender: editGenderInput,
                location : editLocation,
                createdBy: user.phone
              };
              firebase
                .database()
                .ref(`reports/${data.name}`)
                .set(data, (error) => {
                  if (error) {
                    setErrorMsg("Server Error");
                  } else {
                    getMyPosts();
                    setEditAge("")
                    setEditAddress("")
                    setEditImage("")
                    setEditLocation("")
                    setErrorMsg("Success to edit victim!")
                    setEditModal(!editModal)
                  }
                });
            });
        }
      );
      // console.log(editName, editAge)
    } else {
      setErrorMsg("Please fill in all the forms!");
    }
  };

  const onEditCancel = () => {
    setEditAge("")
    setEditAddress("")
    setEditImage("")
    setEditLocation("")
    setEditModal(!editModal)
  }
  // --------------------------------------------------------END OF EDIT SECTION---------------------------------------------------

  // ======================================================DELETE SECTION=====================================================
  const [deleteData, setDeleteData] = useState({})

  const onDeleteClicked = (data) => {
    setDeleteData({msg : `Are you sure want to delete ${data.name}?`, data} )
  }

  const onDeleteData = (data) => {
    firebase.database().ref(`reports/${data.name}`).remove()
    .then(() => {
      setErrorMsg(`${data.name} deleted!`)
      getMyPosts();
    })
    .catch(() => {
      setErrorMsg("Server Error")
    })
  }

  // ==================================================END OF DELETE SECTION=====================================================

  // ======================================================RENDER POSTS=========================================================
  const renderData = () => {
    var views = Object.keys(getData).map((key, i) => {
      if (getData[key].createdBy == user.phone) {
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
              <center className='ion-margin-top'>
                <IonButton color='danger' onClick={() => onDeleteClicked(getData[key])}>
                  <IonIcon icon={trash} slot='start'/>
                  Delete
                </IonButton>
                <IonButton color='warning' onClick={() => editHandler(getData[key])}>
                  <IonIcon icon={create} slot="start"/>
                  Edit
                </IonButton>
              </center>
            </IonCardContent>
          </IonCard>
        );
      }
    });
    return views;
  };
  // ====================================================END OF RENDER POSTS======================================================

  // --------------------------------------------------------RENDER----------------------------------------------------------------
  if (user.phone == "") {
    return <Redirect to="/login" />;
  }
  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!errorMsg}
        message={errorMsg}
        buttons={[{ text: "Okay", handler: () => setErrorMsg("")}]}
      />
      <IonAlert
        isOpen={!!deleteData.msg}
        message={deleteData.msg}
        buttons={[{ text: "Cancel", handler: () => setDeleteData({})}, { text: "Delete", handler: () => onDeleteData(deleteData.data)}]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color={theme.darkMode ? "medium" : "primary"}>
            <IonTitle>My Posts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color={theme.darkMode ? "dark" : "light"}>
          {renderData()}

          {/*-------------------------------------------------UPLOAD MODAL---------------------------------------------------------*/}
          <IonModal isOpen={modal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Add new victim</IonTitle>
                <IonText
                  slot="end"
                  color="primary"
                  onClick={() => setModal(!modal)}
                >
                  Close
                </IonText>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput type="text" ref={nameRef} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Age</IonLabel>
                <IonInput type="number" ref={ageRef} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Address</IonLabel>
                <IonInput type="text" ref={addressRef} />
              </IonItem>
              <IonItem>
                <input type="file" onChange={handleOnChange} />
              </IonItem>
              <IonItem>
                <IonList>
                  <IonRadioGroup
                    value={genderInput}
                    onIonChange={(e) => setGenderInput(e.detail.value)}
                  >
                    <IonLabel >Gender</IonLabel>
                    <IonItem>
                      <IonLabel>Male</IonLabel>
                      <IonRadio slot="start" value="Male" />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Female</IonLabel>
                      <IonRadio slot="start" value="Female" />
                    </IonItem>
                  </IonRadioGroup>
                </IonList>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Location</IonLabel>
                <IonInput type="text" ref={locationRef}/>
              </IonItem>
              <center className="ion-margin">
                <IonButton color='danger' block onClick={() => setModal(!modal)}>Cancel</IonButton>
                <IonButton block onClick={handleUpload}>Save</IonButton>
              </center>
            </IonContent>
          </IonModal>
          {/*----------------------------------------------END OF UPLOAD MODAL------------------------------------------------*/}

          {/* ------------------------------------------------EDIT MODAL------------------------------------------------- */}
          <IonModal isOpen={editModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit the victim</IonTitle>
                <IonText
                  slot="end"
                  color="primary"
                  onClick={() => setEditModal(!editModal)}
                >
                  Close
                </IonText>
              </IonToolbar>
            </IonHeader>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput type="text" value={editName} disabled/>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Age</IonLabel>
              <IonInput type="number" value={editAge} onIonChange={e => setEditAge(e.target.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput type="text" value={editAddress} onIonChange={e => setEditAddress(e.target.value)}/>
            </IonItem>
            <IonItem>
              {/* <IonLabel>Photo</IonLabel> */}
              <input type="file" onChange={handleOnEditChange} />
              {/* <IonButton type='button' onClick={() => {}}>{image ? image.name : "Pick a Picture"}</IonButton> */}
            </IonItem>
            <IonItem>
              <IonList>
                <IonRadioGroup
                  value={editGenderInput}
                  onIonChange={(e) => setEditGenderInput(e.detail.value)}
                >
                  <IonLabel>Gender</IonLabel>
                  <IonItem>
                    <IonLabel>Male</IonLabel>
                    <IonRadio slot="start" value="Male" />
                  </IonItem>
                  <IonItem>
                    <IonLabel>Female</IonLabel>
                    <IonRadio slot="start" value="Female" />
                  </IonItem>
                </IonRadioGroup>
              </IonList>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Location</IonLabel>
              <IonInput type="text" value={editLocation} onIonChange={e => setEditLocation(e.target.value)}/>
            </IonItem>
            <center className="ion-margin">
              <IonButton color='danger' block onClick={() => onEditCancel()}>Cancel</IonButton>
              <IonButton block onClick={handleEditUpload}>Save</IonButton>
            </center>
          </IonModal>
          {/* ----------------------------------------------END OF EDIT MODAL------------------------------------------------ */}

          {/* -----------------------------------------------ADD BUTTON--------------------------------------------------------- */}
          {!modal ? (
            <IonImg
              fill="#FFFFFF"
              style={{
                backgroundColor: theme.darkMode ? "#3dc2ff" : "#3880FF",
                width: "55px",
                borderRadius: "50%",
                position: "fixed",
                bottom: "55px",
                right: "3vw",
                zIndex: 99
              }}
              src={ImgAdd}
              onClick={() => setModal(!modal)}
            />
          ) : null}
          {/* --------------------------------------------END OF ADD BUTTON----------------------------------------------------- */}
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default MyPost;
