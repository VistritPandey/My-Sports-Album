import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";

const numColumns = 3; // researched that there are 30 teams in baseball in the US, so thought that 3 teams per column would be perfect. Can change it according to your preference

const WIDTH = Dimensions.get("window").width;

// Don't have the data so just passed dummy numbers
const dataList = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
];
export default class App extends Component {
  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return dataList;
  };

  _renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.itemStyle, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() {
    let { container, itemText } = styles;
    return (
      <View style={container}>
        <FlatList
          data={this.formatData(dataList, numColumns)}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  itemText: {
    fontSize: 50,
    color: "#fff",
  },
  item: {
    flex: 1,
    backgroundColor: "#57485d",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    height: WIDTH / numColumns,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
