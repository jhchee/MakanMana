import React from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import { Constants } from "expo";
import { Container } from "native-base";
import CustomHeader from "../../UIComponent/CustomHeader";
import { Icon } from "react-native-elements";

class MyProfile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerLeft: (
      <Icon
        navigate={navigation.navigate}
        name="ios-menu"
        type="ionicon"
        style={{ paddingLeft: 10 }}
        // onPress={() => navigation.drawerOpen()}
      />
    ),
    drawerLabel: "Profile",
    drawerIcon: ({ tintColor }) => <Icon name="ios-person" type="ionicon" />
  });

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          title="Profile"
          drawerOpen={() => this.props.navigation.openDrawer()}
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

export default MyProfile;
