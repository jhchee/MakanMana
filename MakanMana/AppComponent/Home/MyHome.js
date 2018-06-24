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
      <View style={styles.container}>
        <CustomHeader
          title="Home"
          drawerOpen={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <View
          style={{
            alignItems: "flex-end",
            margin: 0,
            marginRight: 20,
            padding: 0
          }}
        >
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
        <View
          style={{
            backgroundColor: "orange",
            marginTop: 20,
            flex: 1
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              margin: 10
            }}
          >
            RECENT VIEW
          </Text>
          <ScrollView>
            <RecentView />
            <RecentView />
            <RecentView />
            <RecentView />
            <RecentView />
          </ScrollView>
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
