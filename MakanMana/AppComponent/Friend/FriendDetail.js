import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import { Icon } from "react-native-elements";
import { Navigation } from "react-navigation";

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
        console.log(this.state.preference);
      });
  };
  _back = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: Constants.statusBarHeight + 10,
            left: 10
          }}
          onPress={this._back}
        >
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
        <View style={{ marginTop: 40 }} />

        {this.state.gender ? (
          <View style={styles.textBox}>
            <View style={styles.fieldIndicator}>
              <Icon
                name="gender-transgender"
                type="material-community"
                size={20}
              />
            </View>
            <Text style={styles.userDetail}>{this.state.gender}</Text>
          </View>
        ) : null}

        {this.state.status ? (
          <View style={styles.textBox}>
            <Text style={styles.fieldTitle}>Status{"        "}</Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                maxWidth: 300
              }}
            >
              <Text style={styles.textSetting}>{this.state.status}</Text>
            </View>
          </View>
        ) : null}

        {/* <View style={{ maxWidth: 50 }}>
          <Text>{this.state.preference}</Text>
        </View> */}
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
    fontSize: 17,
    flex: 1,
    flexWrap: "wrap"
  },
  fieldTitle: {
    fontWeight: "bold"
  },
  backgroundContainer: {
    position: "absolute",
    top: Constants.statusBarHeight,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#EE7600",
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
  },
  textBox: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    left: 40
  },
  fieldIndicator: {
    flex: 1
  },
  userDetail: {
    fontSize: 17,
    flex: 5
  }
});
export default FriendDetail;
