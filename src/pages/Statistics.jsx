import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'
import firebase from '../supports/firebase'
import { IonAlert, IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';


const Statistics = () => {
  const user = useSelector((state) => state.userReducer);
  const [frequent, setFrequent] = useState([])
  const [location, setLocation] = useState([])
  const [generateColor, setGenerateColor] = useState([])
  const [errorMsg, setErrorMsg] = useState()

  const theme = useSelector(state => state.theme)

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = () => {
    var tempLocation = []
    var tempData = []
    var tempColor = []
    // var temp = 1
    firebase
    .database()
    .ref(`reports/`)
    .get()
    .then((res) => {
      Object.keys(res.val()).map((key, i) => {
        tempData.push(1)
        if(tempLocation.includes(res.val()[key].location)){
          tempData[tempLocation.indexOf(res.val()[key].location)] += 1
          tempData.splice(i, 1)
        }else{
          tempLocation.push(res.val()[key].location)
        }
      })
      // setLocation(oldLocation => [...oldLocation, res.val()[key].location])
      setLocation(tempLocation)
      setFrequent(tempData)
      for(var i=0; i<tempData.length; i++){
        var color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        tempColor.push(color)
      }
      setGenerateColor(tempColor)
    })
    .catch(() => {
      setErrorMsg("Server Error");
    });
  };

  if(user.role !== "admin"){
    return <Redirect to='/login'/>
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
            <IonTitle>
              Statistics
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color={theme.darkMode ? "dark" : "light"}>
          <Bar data={{
            labels: location,
            datasets: [{
              label: "# of Victims",
              data: frequent,
              backgroundColor: generateColor,
              borderColor: generateColor,
              borderWidth: 1
            }]
          }} width={400} height={600} options={{scales:{
            yAxes: [{
              ticks:{
                beginAtZero: true
              }
            }]
          }}}/>
        </IonContent>
      </IonApp>
    </React.Fragment>
  )
}

export default Statistics
