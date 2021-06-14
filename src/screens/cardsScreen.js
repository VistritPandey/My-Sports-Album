import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  DevSettings,
} from "react-native";

const axios = require("axios");
const numColumns = 3;
const WIDTH = Dimensions.get("window").width;

export default function ({ navigation }) {
  // var forceUpdateHandler = forceUpdateHandler.bind();
  // function forceUpdateHandler(){
  //   this.forceUpdate();
  // };
  const [images, setimages] = useState([
    { src: require("../../assets/lock.png"), key: "1" },
  ]);

  const [lock, setlock] = useState(true);
  const [curr, setcurr] = useState(0);
  const [videoURL, setvideoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/msa--demo.appspot.com/o/Phillies%2FRPReplay_Final1599145863.mov?alt=media&token=ee5d62c0-e583-4c48-b056-bc1627b160cf"
  );
  const val = async () => {
    try {
      let response = await fetch(
        "http://10.0.2.2:5000/getCurrency/email/" + global.email + "/"
      );
      let json = await response.json();
      console.log("res", json["int"]);
      setcurr(json["int"]);
      return json["int"];
    } catch (error) {
      console.error(error);
    }
  };
  val();
  function afterPopup() {
    var ifEnoughMoney = async () => {
      try {
        let response = await fetch(
          "http://10.0.2.2:5000/enoughCurrency/email/" + global.email + "/100/"
        );
        let json = await response.json();
        console.log("res", json["curr"]);
        return json["curr"];
      } catch (error) {
        console.error(error);
      }
    };

    if (ifEnoughMoney()) {
      fetch(
        "http://10.0.2.2:5000/updateCurrency/email/" + global.email + "/-100/"
      );
      fetch("http://10.0.2.2:5000/cardUnlock/" + global.email + "/Phillies/");
      console.log("till here");
      setlock(false);
      val();
      navigation.navigate("card");
    } else {
      Alert.alert("Lol!", "You don't have enough money.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }
  const createTwoButtonAlert = () =>
    Alert.alert("Confirmation!", "Do you want to spend 100 Ls for this card?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => afterPopup() },
    ]);

  if (lock) {
    console.log("locked");
    return (
      <View style={styles.container}>
        <Text style={styles.TopBar}>{curr}</Text>

        <FlatList
          numColumns={numColumns}
          showsHorizontalScrollIndicator={true}
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => createTwoButtonAlert()}>
              <Image
                source={item.src}
                style={{
                  paddingTop: 10,
                  padding: 10,
                  width: WIDTH / numColumns,
                  borderWidth: 1,
                  resizeMode: "stretch",
                  flex: 1,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  height: WIDTH / numColumns + 25,
                  borderRadius: 15,
                  borderColor: "#fff",
                }}
              />
              <Text style={styles.tex}>Philles Triple Play</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    console.log("should unlock here");
    return (
      <View style={styles.container}>
        <Text style={styles.TopBar}>{curr} LS</Text>

        <FlatList
          numColumns={numColumns}
          showsHorizontalScrollIndicator={true}
          data={images}
          renderItem={() => (
            <TouchableOpacity
              onPress={() => navigation.navigate("video", { vidURL: videoURL })}
              style={{
                paddingVertical: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/msa--demo.appspot.com/o/Phillies%2FPhillies%20Triple%20Play.jpg?alt=media&token=02f01f5a-8ae3-47c0-b823-858157bd5c08",
                  cache: "force-cache",
                }}
                style={{
                  paddingTop: 10,
                  padding: 10,
                  width: WIDTH / numColumns,
                  borderWidth: 1,
                  resizeMode: "stretch",
                  flex: 1,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  height: WIDTH / numColumns + 25,
                  borderRadius: 15,
                  borderColor: "#fff",
                }}
              />
              <Text style={styles.tex}>Philles Triple Play</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  TopBar: {
    alignSelf: "auto",
    height: 50,
    flexDirection: "row", // row
    backgroundColor: "#002D72",
    alignItems: "center",
    justifyContent: "space-between", // center, space-around
    paddingRight: 10,
    paddingBottom: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "right",
  },
  container: {
    flex: 1,
    paddingTop: 1,
  },
  tex: {
    //backgroundColor: "#fff",
    paddingLeft: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
