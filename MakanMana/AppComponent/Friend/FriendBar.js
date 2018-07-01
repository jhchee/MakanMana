import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class FriendBar extends React.Component {
  constructor(props) {
    super(props);
    const { profile_name, profile_pic, status, user } = this.props.friendInfo;
    this.state = {
      profileName: profile_name,
      profilePic: profile_pic,
      userStatus: status,
      profileId: user
    };
  }

  _verifyIsFriend(userId) {
    // result = this.props.store.friendList.filter(ele => {
    //   if (ele === userId) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // return result.length;
    const list = this.props.store.friendList;
    const id = this.state.profileId;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === id) return True;
    }
    return False;
  }
  _addFriend() {}
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
          {this._verifyIsFriend() ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity onPress={this._addFriend}>
                <Icon name={"plus"} type="entypo" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ) : null}
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
