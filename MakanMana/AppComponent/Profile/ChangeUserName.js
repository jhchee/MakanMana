import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Constants } from "expo";

class ChangeUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "chee"
    };
  }
  _goBack = () => {
    this.props.navigation.goBack(null);
  };

  _updateUserName = () => {
    const BASE_URL = "http://10.0.2.2:8000/user_base/profile/detail/";
    const profile_id = "1";
    const token = "Token ".concat(
      "966b2172505684bb4630ba62feea43531e173ec9523daf0b019728a671d27e51"
    );
    var ENDPOINT = BASE_URL.concat(profile_id);
    fetch(ENDPOINT, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        profile_name: this.state.username
      })
    });
    this._goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter your name</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            value={this.state.username}
            underlineColorAndroid="#ff8000"
            onChangeText={value => this.setState({ username: value })}
            selectTextOnFocus={true}
            maxLength={20}
            style={styles.inputField}
          />
        </View>
        {/* <View sytle={styles.buttonContainer}>
          <View>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={this._goBack}
            >
              <Text>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={this._updateUserName}
            >
              <Text>CHANGE</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <Button title="CANCEL" onPress={this._goBack} />
        <Button title="CHANGE" onPress={this._updateUserName} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight
  },
  header: {
    height: 60,
    backgroundColor: "orange",
    justifyContent: "center"
  },
  headerText: {
    color: "white",
    fontSize: 20,
    margin: 10
  },
  inputField: {
    fontSize: 18,
    height: 50,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    width: 20
  },
  navigateButton: {
    flex: 1,
    backgroundColor: "black",
    height: 20,
    width: 20
  }
});

export default ChangeUserName;
