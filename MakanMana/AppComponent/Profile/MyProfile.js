import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import CustomHeader from "../../UIComponent/CustomHeader";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import ChangePicture from "./ChangePicture";
import ChangeUserName from "./ChangeUserName";
import ChangeStatus from "./ChangeStatus";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      user_picture: "https://dummyimage.com/500x500/000/f1f1f1.png&text=+",
      user_age: "",
      user_gender: "",
      user_status: ""
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    drawerLabel: "Profile",
    drawerIcon: ({ tintColor }) => <Icon name="ios-person" type="ionicon" />
  });

  restAPI = () => {
    const ELMLAB = "http://192.168.31.60:8000";
    const HOSTEL = "http://172.17.6.127:8000";
    const ELMLAB2 = "http://10.10.0.155:8000";
    var ENDPOINT = ELMLAB.concat(
      "/user_base/profile-list/?email=chee@gmail.com"
    );
    fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        const {
          profile_pic,
          profile_name,
          user,
          gender,
          status,
          recent_location_X,
          recent_location_Y
        } = myJson[0];
        this.setState({
          user_picture: profile_pic,
          user_name: profile_name,
          user_gender: gender,
          user_status: status
        });
      });
  };

  componentDidMount() {
    this.restAPI();
  }

  _Profile = () => {
    this.props.navigation.navigate("Profile");
  };
  _ManipulateUserName = () => {
    console.log("connected1");
    this.props.navigation.navigate("ChangeUserName");
  };
  _ManipulateStatus = () => {
    this.props.navigation.navigate("ChangeStatus");
  };
  _ManipulatePicture = () => {
    this.props.navigation.navigate("ChangePicture");
  };
  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    drawerLabel: "Profile",
    drawerIcon: ({ tintColor }) => <Icon name="ios-person" type="ionicon" />
  });
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Profile"
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <View style={styles.centered}>
          <TouchableOpacity onPress={this._ManipulatePicture}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: this.state.user_picture
              }}
            />
          </TouchableOpacity>
        </View>

        {this.state.user_name ? (
          <View style={styles.textBox}>
            <View style={styles.fieldIndicator}>
              <Icon name="account" type="material-community" size={20} />
            </View>

            <Text style={styles.userDetail}>{this.state.user_name}</Text>
            <View style={styles.editPencil}>
              <TouchableOpacity onPress={this._ManipulateUserName}>
                <Icon
                  name="grease-pencil"
                  type="material-community"
                  size={20}
                  color="#FF8C00"
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {this.state.user_gender ? (
          <View style={styles.textBox}>
            <View style={styles.fieldIndicator}>
              <Icon
                name="gender-transgender"
                type="material-community"
                size={20}
              />
            </View>

            <Text style={styles.userDetail}>{this.state.user_gender}</Text>
            <View style={styles.editPencil} />
          </View>
        ) : null}

        {this.state.user_status ? (
          <View style={styles.textBox}>
            <View style={styles.statusIndicator}>
              <Text style={styles.statusText}>Status</Text>
            </View>
            <TouchableOpacity
              style={styles.userStatus}
              onPress={this._ManipulateStatus}
            >
              <Text>{this.state.user_status}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: Constants.statusBarHeight
  },
  icon: {
    height: 24,
    width: 24
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicture: {
    marginTop: 20,
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius: 100
  },
  circledButton: {
    borderRadius: 100,
    width: 70,
    height: 70
  },
  textBox: {
    marginTop: 1,
    backgroundColor: "white",
    height: 55,
    flexDirection: "row",
    alignItems: "center"
  },
  fieldIndicator: {
    flex: 1
  },
  userDetail: {
    fontSize: 21,
    marginLeft: 15,
    flex: 5
  },
  editPencil: {
    flex: 1
  },
  userStatus: {
    flex: 5
  },
  statusText: {
    fontWeight: "bold",
    marginLeft: 10
  },
  statusIndicator: {
    flex: 1
  }
});

export default (MyProfile = createStackNavigator(
  {
    MainProfile: {
      screen: MyProfile
    },

    ChangeUserName: {
      screen: ChangeUserName
    },
    ChangePicture: {
      screen: ChangePicture
    },
    ChangeStatus: {
      screen: ChangeStatus
    }
  },
  {
    // mode: "modal",
    headerMode: "none"
  }
));

// export default MyProfile;
