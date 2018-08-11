import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import { observer } from "mobx-react";
import mobxstores from "../../mobxstores";

@observer
class ChangeStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: mobxstores.personal.status
    };
  }

  _goBack = () => {
    this.props.navigation.goBack(null);
  };

  _updateUserName = () => {
    const BASE_URL = "http://10.0.2.2:8000/user_base/profile/detail/";
    const profile_id = "1";
    const token = "Token ".concat(
      "9051234390498155ed49aea36c518a1df8d666a7aeb392d92dce1cb455d9ffd0"
    );
    var ENDPOINT = BASE_URL.concat(profile_id);
    fetch(ENDPOINT, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        status: this.state.status
      })
    });
    this._goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter your status</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            value={this.state.status}
            underlineColorAndroid="#ff8000"
            onChangeText={value => this.setState({ status: value })}
            selectTextOnFocus={true}
            maxLength={30}
            style={styles.inputField}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this._goBack}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._updateUserName}
            >
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
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

    height: 50
  },
  navigateButton: {
    flex: 1,
    backgroundColor: "black",
    height: 20,
    width: 20
  },
  button: {
    flex: 1
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18
  }
});
export default ChangeStatus;
