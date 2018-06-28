import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Constants } from "expo";
import {
  createDrawerNavigator,
  StackNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";

class FriendDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { navigation } = this.props;
    const profileId = navigation.getParam("profileId");
    this.setState({ profileId: profileId });
    this._fetchProfileInfo(profileId);
  }
  _fetchProfileInfo(profileId) {
    const ELMLAB = "http://192.168.31.60:8000/user_base/profile/detail/";
    const HOSTEL = "http://172.17.6.127:8000/user_base/profile/detail/";
    // const CORE = "http://10.163.26.52:19000/user_base/profile/detail/";
    const CORE = "http://192.168.137.1:8000/user_base/profile/detail/";
    var ENDPOINT = CORE.concat(profileId);

    fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);

        const {
          age,
          gender,
          preference,
          profile_name,
          profile_pic,
          recent_location_X,
          recent_location_Y,
          status
        } = myJson;
        this.setState({
          age,
          gender,
          preference,
          profile_name,
          profile_pic,
          recent_location_X,
          recent_location_Y,
          status
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> {this.state.profileId} </Text>
        {this.state.age ? <Text> {this.state.age} </Text> : null}
        {this.state.gender ? <Text> {this.state.gender} </Text> : null}
        {this.state.preference ? <Text>{this.state.preference}</Text> : null}
        {this.state.recent_location_X ? <Text> {this.state.age} </Text> : null}
        {this.state.recent_location_Y ? <Text> {this.state.age} </Text> : null}
        {this.state.status ? <Text> {this.state.status} </Text> : null}
        <Image
          style={styles.profilePicture}
          source={{
            uri: this.state.profile_pic
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 100
  }
});
export default FriendDetail;
