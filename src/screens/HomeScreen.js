import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const numColumns = 3;
const WIDTH = Dimensions.get("window").width;

export default function ({ navigation }) {
  const [images, setimages] = useState([
    { src: require("../../assets/Logos/Angels.png"), key: "1" },
    { src: require("../../assets/Logos/Astros.png"), key: "2" },
    { src: require("../../assets/Logos/Athletics.png"), key: "3" },
    { src: require("../../assets/Logos/Braves.png"), key: "4" },
    { src: require("../../assets/Logos/Brewers.png"), key: "5" },
    { src: require("../../assets/Logos/Diamondbacks.png"), key: "6" },
    { src: require("../../assets/Logos/Dodgers.png"), key: "7" },
    { src: require("../../assets/Logos/Giants.png"), key: "8" },
    { src: require("../../assets/Logos/Indians.png"), key: "9" },
    { src: require("../../assets/Logos/Jays.png"), key: "10" },
    { src: require("../../assets/Logos/Mariners.png"), key: "11" },
    { src: require("../../assets/Logos/Marlins.png"), key: "12" },
    { src: require("../../assets/Logos/Mets.png"), key: "13" },
    { src: require("../../assets/Logos/Orioles.png"), key: "14" },
    { src: require("../../assets/Logos/Padres.png"), key: "15" },
    { src: require("../../assets/Logos/Phillies.png"), key: "16" },
    { src: require("../../assets/Logos/Pirates.png"), key: "17" },
    { src: require("../../assets/Logos/Rays.png"), key: "18" },
    { src: require("../../assets/Logos/Reds.png"), key: "19" },
    { src: require("../../assets/Logos/Redsox.png"), key: "20" },
    { src: require("../../assets/Logos/Rockies.png"), key: "21" },
    { src: require("../../assets/Logos/Royals.png"), key: "22" },
    { src: require("../../assets/Logos/Tigers.png"), key: "23" },
    { src: require("../../assets/Logos/Twins.png"), key: "24" },
    { src: require("../../assets/Logos/Whitesox.png"), key: "25" },
    { src: require("../../assets/Logos/Yankees.png"), key: "26" },
    { src: require("../../assets/Logos/Cubs.png"), key: "27" },
    { src: require("../../assets/Logos/Cardinals.png"), key: "28" },
    { src: require("../../assets/Logos/Rangers.png"), key: "29" },
    { src: require("../../assets/Logos/Nationals.png"), key: "30" },
  ]);

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
                //margin: 3,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                height: WIDTH / numColumns,
                borderRadius: 10,
              }}
            />
            <Text style={styles.tex}>{item.key}/100</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  tex: {
    backgroundColor: "#fff",
    paddingLeft: 40,
  },
});
