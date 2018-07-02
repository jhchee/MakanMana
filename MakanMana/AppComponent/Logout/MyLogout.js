import React from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import { Constants } from "expo";
import { Container } from "native-base";
import CustomHeader from "../../UIComponent/CustomHeader";

class MyLogout extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          title="Logout"
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

export default MyLogout;
