import React from "react";

import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";

class ChangeUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }
  _updateUserName = () => {
    fetch("https://mywebsite.com/endpoint/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: "Authentication "
      },
      body: JSON.stringify({
        firstParam: "yourValue",
        profile_name: this.state.username
      })
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>ChangeUserName</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight
  }
});

export default ChangeUserName;
