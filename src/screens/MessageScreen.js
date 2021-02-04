// @refresh reset
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, View, Button, TextInput } from "react-native";
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
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }

  async function handlePress() {
    const _id = Math.random().toString(36).substring(7);
    const user = { _id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Button onPress={handlePress} title="Enter the chat" color="red" />
      </View>
    );
  }
  return <GiftedChat messages={messages} user={user} onSend={handleSend} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderColor: "gray",
    marginBottom: 20,
  },
});
