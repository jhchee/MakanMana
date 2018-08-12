import React from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Constants, ImagePicker } from "expo";
import mobxstores from "../../mobxstores";

class ChangePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUri: null,
      topText: "",
      bottomText: ""
    };
  }
  _onChoosePic = async () => {
    console.log("choosing");
    const { cancelled, uri } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.setState({ imageUri: uri });
      this._updateProfilePicture();
    }
  };

  _onTakePic = async () => {
    const { cancelled, uri } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  };

  _updateProfilePicture = () => {
    // let localUri = this.state.imageUri;
    // let filename = localUri.split("/").pop();

    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("profile_pic", {
      uri: this.state.imageUri,
      name: "hello.png",
      type: "image/png"
    });

    const BASE_URL = mobxstores.store.baseUrl;
    const profile_id = mobxstores.personal.profileId;
    const token = mobxstores.store.token;
    const ENDPOINT = BASE_URL.concat("profile/detail/").concat(profile_id);

    fetch(ENDPOINT, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token
      },
      body: formData
    });
    console.log("uploaded sucessfully");
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={ref => (this.imageView = ref)}
          style={{ width: 300, height: 300 }}
          source={{ uri: this.state.imgUri }}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={this._onChoosePic}>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._onTakePic}>
            <Text style={styles.buttonText}>Take</Text>
          </TouchableOpacity>
        </View>
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
  text: {
    fontSize: 28,
    margin: 20
  },
  buttonText: {
    fontSize: 21
  },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: "#dddddd"
  }
});
export default ChangePicture;
