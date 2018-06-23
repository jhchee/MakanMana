// Do not touch
import React from "react";
// import app components
import Main from "./Main"; // MAIN APP
// extra components
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Expo from "expo";

class App extends React.Component {
  render() {
    return <Main />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
