// @refresh reset
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, View, YellowBox, Button, TextInput } from "react-native";
import "firebase/firestore";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpO4tWkZaI6rotG2z3suYvzge5tjErres",
  authDomain: "msa--demo.firebaseapp.com",
  projectId: "msa--demo",
  storageBucket: "msa--demo.appspot.com",
  messagingSenderId: "466087477986",
  appId: "1:466087477986:web:a420ad3cb4a09d182894bb",
  measurementId: "G-K5W3XMFV72",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const chatsRef = db.collection("chats");

export default MessageScreen = () => {
  return <View></View>;
};
