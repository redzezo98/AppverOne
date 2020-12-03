import React, { Component } from 'react'

async function getTime() {
    fetch("http://10.0.2.2:5000/lang")
    .then((response) => response.json())
    .then((responseJson) => {
   return(responseJson.data[0].time
   )
    })
    .catch((error) => {
      console.error(error)
    })
    
}
export {getTime};
