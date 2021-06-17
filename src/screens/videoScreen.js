import React, { useState } from "react";

import { Video } from "expo-av";

import {
  Button,
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
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
          data={images}
          renderItem={({ item }) => (
            <Image
              source={item.src}
              style={{
                width: 100,
                resizeMode: "contain",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: 500,
                aspectRatio: 1,
                borderColor: "#fff",
              }}
            />
          )}
        />
        <Button
          onPress={() => stateChange(false)}
          title="Flip to See the video"
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
          useNativeControls={true} //need feedback on it
          resizeMode="cover"
          shouldPlay
          style={{
            width: 370,
            height: 400,
          }}
        />
        <View style={{ height: 100, marginTop: 10 }}>
          <Button
            onPress={() => stateChange(true)}
            title="Flip to See the Description"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 20,
    paddingRight: 20,
    margin: -10,
  },
});
