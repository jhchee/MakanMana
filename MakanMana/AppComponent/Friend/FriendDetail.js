import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import { Icon } from "react-native-elements";

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

    await fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        const {
          gender,
          preference,
          profile_name,
          profile_pic = "https://dummyimage.com/500x500/000/000000.png",
          recent_location_X,
          recent_location_Y,
          status
        } = myJson;
        this.setState({
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
        <View style={styles.backgroundContainer} />
        <TouchableOpacity style={{ alignContent: "flex-start" }}>
          <Icon name={"md-arrow-back"} type="ionicon" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <View style={styles.haloBackground}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: this.state.profile_pic
              }}
            />
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {this.state.profile_name}
          </Text>
        </View>

        <View style={styles.infoBox}>
          {this.state.gender ? (
            <View>
              <Icon name={"plus"} type="entypo" size={30} color="black" />
              <Text style={styles.fieldTitle}>{this.state.gender}</Text>
            </View>
          ) : null}
          {this.state.preference ? <Text>{this.state.preference}</Text> : null}
          {this.state.status ? (
            <Text style={styles.textSetting}>
              {" "}
              <Text style={styles.fieldTitle}>Status</Text> {this.state.status}{" "}
            </Text>
          ) : null}
        </View>
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
    height: 75,
    width: 75,
    borderRadius: 100
  },
  imageContainer: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center"
  },
  textSetting: {
    fontSize: 17
  },
  fieldTitle: {
    fontWeight: "bold",
    margin: 10
  },
  backgroundContainer: {
    position: "absolute",
    top: Constants.statusBarHeight,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "orange",
    height: 200
  },
  haloBackground: {
    backgroundColor: "white",
    height: 80,
    width: 80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  infoBox: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  }
});
export default FriendDetail;
