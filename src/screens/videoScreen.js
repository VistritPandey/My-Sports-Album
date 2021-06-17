// import Video from 'react-native-video';
// import convertToProxyURL from 'react-native-video-cache';
import React, { useState } from "react";

import { Video } from "expo-av";

import {
  Button,
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
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

export default function ({ route, navigation }) {
  const numColumns = 3;
  const WIDTH = Dimensions.get("window").width;
  const uRl = route.params;
  console.log("vid", uRl["vidURL"]);
  const [images, setimages] = useState([
    { src: require("../../assets/Phillies_card.png"), key: "1" },
  ]);
  const [flip, setflip] = useState(false);
  const stateChange = function (bol) {
    setflip(bol);
  };

  if (flip) {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={numColumns}
          showsHorizontalScrollIndicator={true}
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image
                source={item.src}
                style={{
                  width: 100,
                  //borderWidth: 1,
                  resizeMode: "contain",
                  flex: 1,
                  //backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 400,
                  aspectRatio: 1,
                  borderColor: "#fff",
                }}
              />
            </TouchableOpacity>
          )}
        />
        <Button
          onPress={() => stateChange(false)}
          title="Flip to See the Description"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: uRl["vidURL"] }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{
            width: 350,
            height: 400,
          }}
        />
        <Button
          onPress={() => stateChange(true)}
          title="Flip to See the Description"
        />
      </View>
    );
  }
}

// Later on in your styles..
// var styles = StyleSheet.create({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 50,
//     left: 50,
//     bottom: 50,
//     right: 50,
//   },
// });
const styles = StyleSheet.create({
  /*TopBar: {
    alignSelf: "stretch",
    height: 52,
    flexDirection: "row", // row
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between", // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
  },*/
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tex: {
    backgroundColor: "#fff",
    paddingLeft: 40,
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
