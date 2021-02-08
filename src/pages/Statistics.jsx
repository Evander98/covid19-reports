import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'
import firebase from '../supports/firebase'
import { IonAlert } from '@ionic/react';


const Statistics = () => {
  const user = useSelector((state) => state.userReducer);
  const [frequent, setFrequent] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const [location, setLocation] = useState([])

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = () => {
    var tempLocation = []
    var tempData = []
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
      <button >tes</button>
      <Bar data={{
        labels: location,
        datasets: [{
          label: "# of Victims",
          data: frequent,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }} width={400} height={600} options={{scales:{
        yAxes: [{
          ticks:{
            beginAtZero: true
          }
        }]
      }}}/>
    </React.Fragment>
  )
}

export default Statistics
