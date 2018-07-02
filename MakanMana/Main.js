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
import { createDrawerNavigator, DrawerItems } from "react-navigation";
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
    Home: {
      screen: MyHome,
      navigationOptions: ({ navigation }) => ({
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => <Icon name="ios-home" type="ionicon" />
      })
    },
    Friend: {
      screen: MyFriend,
      navigationOptions: ({ navigation }) => ({
        title: "Friend",
        drawerLabel: "Friend",
        drawerIcon: ({ tintColor }) => <Icon name="ios-people" type="ionicon" />
      })
    },
    Room: {
      screen: MyRoom,
      navigationOptions: ({ navigation }) => ({
        title: "Room",
        drawerLabel: "Room",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-analytics" type="ionicon" />
        )
      })
    },
    Profile: {
      screen: MyProfile,
      navigationOptions: ({ navigation }) => ({
        title: "Profile",
        drawerLabel: "Profile",
        drawerIcon: ({ tintColor }) => <Icon name="ios-person" type="ionicon" />
      })
    },
    Logout: {
      screen: MyLogout,
      navigationOptions: ({ navigation }) => ({
        title: "Logout",
        drawerLabel: "Logout",
        drawerIcon: ({ tintColor }) => (
          <Icon name="logout" type="material-community" size={19} />
        )
      })
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
