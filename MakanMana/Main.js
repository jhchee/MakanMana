// Do not touch
import React from "react";
// import app components
import MyHome from "./AppComponent/Home/MyHome";
import MyFriend from "./AppComponent/Friend/MyFriend";
import MyProfile from "./AppComponent/Profile/MyProfile";
import MyRoom from "./AppComponent/Room/MyRoom";
import MyLogout from "./AppComponent/Logout/MyLogout";
// extra components
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Constants } from "expo";
import {
  createDrawerNavigator,
  StackNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";
import { Container, Content, Header, Body } from "native-base";
import Expo from "expo";
import { Avatar, Icon } from "react-native-elements";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return <MyMain style={styles.container} />;
  }
}

const CustomDrawerContentComponent = props => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Avatar
          size="xlarge"
          rounded
          source={require("./assets/DrawerIcons/dummy.png")}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={{ marginTop: 10, fontSize: 15 }}>Name Here</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

export const MyMain = createDrawerNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    Home: {
      screen: MyHome
    },
    Friend: {
      screen: MyFriend
    },
    Room: {
      screen: MyRoom
    },
    Profile: {
      screen: MyProfile
    },
    Logout: {
      screen: MyLogout
    }
  },

  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
  drawerHeader: {
    height: 150,
    backgroundColor: "white"
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});

export default Main;
