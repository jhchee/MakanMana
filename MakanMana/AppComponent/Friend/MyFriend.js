import React from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import { Constants } from "expo";
import { Container } from "native-base";
import CustomHeader from "../../UIComponent/CustomHeader";
import { Icon } from "react-native-elements";

class MyFriend extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Friend",
    headerLeft: (
      <Icon
        navigate={navigation.navigate}
        name="ios-menu"
        type="ionicon"
        style={{ paddingLeft: 10 }}
        onPress={() => navigation.drawerOpen()}
      />
    ),
    drawerLabel: "Friend",
    drawerIcon: ({ tintColor }) => <Icon name="ios-people" type="ionicon" />
  });

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          title="Friend"
          drawerOpen={() => {
            this.props.navigation.openDrawer();
          }}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight
  },
  icon: {
    height: 24,
    width: 24
  }
});

export default MyFriend;
