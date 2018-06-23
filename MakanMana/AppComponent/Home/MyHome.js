import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Constants } from "expo";
import { Container } from "native-base";
import CustomHeader from "../../UIComponent/CustomHeader";
import { Icon } from "react-native-elements";

import FindButton from "./FindButton";
import RecentView from "./RecentView";
const height = Dimensions.get("window").height;

class MyHome extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: (
      <Icon
        navigate={navigation.navigate}
        name="ios-menu"
        type="ionicon"
        style={{ paddingLeft: 10 }}
        // onPress={() => navigation.drawerOpen()}
      />
    ),
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => <Icon name="ios-home" type="ionicon" />
  });

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          title="Home"
          drawerOpen={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <View style={{ marginTop: 20, marginRight: 10, position: "relative" }}>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Icon
                name="eyedropper"
                type="material-community"
                color="orange"
                size={28}
              />
            </TouchableOpacity>
          </View>
          <FindButton />
        </View>
        <View style={{ marginTop: height / 3 - 10, marginLeft: 10 }}>
          <Text
            style={[styles.orangeText, { fontSize: 20, fontWeight: "bold" }]}
          >
            RECENT VIEW
          </Text>

          <ScrollView>
            <RecentView />
          </ScrollView>
        </View>
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
  },
  orangeText: {
    color: "orange"
  },
  rightAlignText: {
    alignSelf: "flex-end"
  }
});

export default MyHome;
