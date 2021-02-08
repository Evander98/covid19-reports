import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'
import firebase from '../supports/firebase'
import { IonAlert } from '@ionic/react';


const Statistics = () => {
  const user = useSelector((state) => state.userReducer);
  const [getData, setGetData] = useState({})
  const [errorMsg, setErrorMsg] = useState()
  const [location, setLocation] = useState([])

  useEffect(() => {
    getAllPosts()
    // translateData()
  }, [])

  const getAllPosts = () => {
    var tempLocation = []
    var temp = []
    firebase
      .database()
      .ref(`reports/`)
      .get()
      .then((res) => {
        setGetData(res.val());
        Object.keys(res.val()).map((key, i) => {
          tempLocation.push(res.val()[key].location)
        })
        // setLocation(oldLocation => [...oldLocation, res.val()[key].location])
        for(var i=0; i<1; i++){
          for(var j=0; j<tempLocation.length; j++){
            temp.push(tempLocation[j])
            if(tempLocation[i+1] == tempLocation[j]){
              temp.splice(j, 1)

              console.log(tempLocation)
            }else{
            }
          }
        }
        setLocation(temp)
        console.log(location)
      })
      .catch(() => {
        setErrorMsg("Server Error");
      });
  };

  // const translateData = () => {
  //   Object.keys(getData).map((key, i) => {
  //     return setLocation(oldLocation => [...oldLocation, getData[key].location])
  //   })
  //   console.log(location)
    
  // }


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
          data: [12, 19, 3, 5, 2, 3],
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
