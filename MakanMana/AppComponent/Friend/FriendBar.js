import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

class FriendBar extends React.Component {
  constructor(props) {
    super(props);
    const { profile_name, profile_pic, status, id } = this.props.friendInfo;
    this.state = {
      profileName: profile_name,
      profilePic: profile_pic,
      userStatus: status,
      profileId: id
    };
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.detailBox}>
            <TouchableOpacity
              onPress={() => this.props._detailPage(this.state.profileId)}
            >
              <View style={styles.details}>
                <Image
                  style={styles.profilePicture}
                  source={{
                    uri: this.state.profilePic
                  }}
                />
                <View style={{ marginRight: 10 }}>
                  <Text style={styles.userName}>
                    {this.state.profileName} {"\n"}
                    <Text style={styles.userStatus}>
                      {this.state.userStatus}
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity>
              <Icon name={"plus"} type="entypo" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.breakLine} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  detailBox: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 10,
    flex: 6
  },
  details: {
    flexDirection: "row"
  },
  userName: {
    color: "black",
    fontSize: 18,
    marginLeft: 20,
    marginRight: 10
  },
  userStatus: {
    color: "grey",
    fontSize: 12,
    width: 10
  },
  breakLine: {
    marginTop: 20,
    height: 1,
    backgroundColor: "#f1f1f1"
  }
});

export default FriendBar;
