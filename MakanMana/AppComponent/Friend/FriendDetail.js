import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Constants } from "expo";

class FriendDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_pic: "https://dummyimage.com/500x500/000/000000.png"
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const profileId = navigation.getParam("profileId");
    this.setState({ profileId: profileId });
    this._fetchProfileInfo(profileId);
  }
  _fetchProfileInfo = async profileId => {
    var ENDPOINT = "http://10.0.2.2:8000/user_base/profile/detail/".concat(
      profileId
    );

    const fetching = await fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        const {
          age,
          gender,
          preference,
          profile_name,
          profile_pic = "https://dummyimage.com/500x500/000/000000.png",
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
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: this.state.profile_pic
            }}
          />
        </View>

        {this.state.age ? (
          <Text style={styles.textSetting}>
            {" "}
            <Text style={styles.fieldTitle}>Age</Text> {this.state.age}{" "}
          </Text>
        ) : null}
        {this.state.gender ? (
          <Text style={styles.textSetting}>
            {" "}
            <Text style={styles.fieldTitle}>Gender</Text> {this.state.gender}{" "}
          </Text>
        ) : null}
        {/* {this.state.preference ? <Text>{this.state.preference}</Text> : null} */}
        {/* {this.state.recent_location_X ? <Text> {this.state.age} </Text> : null} */}
        {/* {this.state.recent_location_Y ? <Text> {this.state.age} </Text> : null} */}
        {this.state.status ? (
          <Text style={styles.textSetting}>
            {" "}
            <Text style={styles.fieldTitle}>Status</Text> {this.state.status}{" "}
          </Text>
        ) : null}
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
  },
  imageContainer: {
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 20
  },
  textSetting: {
    fontSize: 17
  },
  fieldTitle: {
    fontWeight: "bold",
    margin: 10
  }
});
export default FriendDetail;
