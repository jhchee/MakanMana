import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

class FindButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          margin: 0,
          padding: 0
        }}
      >
        <TouchableOpacity style={styles.circledbutton}>
          <Icon name={"chevron-right"} size={40} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  circledbutton: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "orange",
    borderRadius: 100
  }
});
export default FindButton;
