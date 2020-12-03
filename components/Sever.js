import React, { Component } from 'react'
import {View, AppRegistry, SectionList, StyleSheet, Text, Alert, Platform} from 'react-native'

const link ='http://8049a77d9374.ngrok.io/'

async function getUserFromSever() {
    try {
        let response = await fetch(link+'recog',{
            header: {           
                'Content-Type':'application/json'
            },
        });
        let responseJson = await response.json();
        console.log(responseJson.data)
        return responseJson.data
    } catch(error) {
        console.error(error)
    }
}

async function getTimeFromSever(linkParam) {
    try {
        let response = await fetch(linkParam);
        let responseJson = await response.json();
        return responseJson.data
    } catch(error) {
        console.error(error)
    }
}

async function postImageToSever(params) {
    try {
        let responseImage = await fetch(link+'recog',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        })
        let responseImageJson = await responseImage.json();
        return responseImageJson;
    }catch(error){
        console.error(error)
    }
}

async function postIDtoSever(params){
    try {
        let responseSignUp = await fetch(link +'signup',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        })
        let responseSignUpJson = await responseSignUp.json();
        return responseSignUpJson;
    }catch(error){
        console.error(error)
        return {'result': 'error'}
    }
}
async function postAnswertoSever(params){
    try {
        let responseSignUp = await fetch(link +'answer',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        })
        let responseSignUpJson = await responseSignUp.json();
        return responseSignUpJson;
    }catch(error){
        console.error(error)
        return {'result': 'error'}
    }
}
async function postAccounttoSever(params){
    try {
        let responseSignIN = await fetch(link +'signin',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        })
        let responseSignINJson = await responseSignIN.json();
        return responseSignINJson;
    }catch(error){
        console.error(error)
        return {'result': 'error'}
    }
}

export {getUserFromSever};
export {postImageToSever};
export {postIDtoSever};
export {postAnswertoSever};
export {postAccounttoSever};
export {getTimeFromSever};