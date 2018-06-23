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
import { Container, Header, Content, Left } from "native-base";

class FindButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center"
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
