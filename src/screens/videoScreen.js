// import Video from 'react-native-video';
// import convertToProxyURL from 'react-native-video-cache';
import React, { useState } from "react";

import { Video } from 'expo-av';

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
  DevSettings
} from "react-native";
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

export default function ({ route,navigation }) {
  const numColumns = 3;
const WIDTH = Dimensions.get("window").width;
const uRl= route.params 
console.log("vid",uRl['vidURL'])
const [images, setimages] = useState([
  { src: require("../../assets/lock.png"), key: "1" }
]);
const [flip, setflip] = useState(false);
const stateChange=function(bol){
  setflip(bol);
}

if(flip){
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
                width: WIDTH / numColumns,
                borderWidth: 1,
                resizeMode: "contain",
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                height: WIDTH / numColumns,
                borderRadius: 10,
                borderColor: "#fff",
              }}
            />
            <Text style={styles.tex}>Philles Triple Play</Text>
          </TouchableOpacity>
          
        )}
      />
      <Button
            onPress={()=>stateChange(false)}
            title="Press Me"
          />
      
    </View>
  );
}
else{
 
  return (
    <View>
        <Video
        source={{ uri: uRl['vidURL'] }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        
        style={{ width: 300, height: 300 }}
        /> 
         <Button
              onPress={()=>stateChange(true)}
              title="Press Me"
            />
   </View>
  )
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
  TopBar: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10
  },
  container: {
    flex: 1,
    paddingTop: 35,
  },
  tex: {
    backgroundColor: "#fff",
    paddingLeft: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
  