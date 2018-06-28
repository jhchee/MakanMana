import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  CameraRoll,
  TouchableOpacity
} from "react-native";
import { Constants, ImagePicker } from "expo";
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
      // console.log(uri) // this logs correctly
      // TODO: why isn't this showing up inside the Image on screen?
      console.log("choosen");
      this._updateProfilePicture();
    }
    console.log("choosen failed");
  };

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: this.state.imageUri });
      console.log("run");
      this._updateProfilePicture();
    }
  };

  // When "Save" is pressed, we snapshot whatever is shown inside
  // of "this.imageView" and save it to the device's camera roll.
  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await CameraRoll.saveToCameraRoll(uri);
    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  };

  _updateProfilePicture = () => {
    // let localUri = this.state.imageUri;
    // let filename = localUri.split("/").pop();

    // console.log("filename:");
    // console.log(filename);

    // // Infer the type of the image
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("profile_pic", {
      uri: this.state.imageUri,
      name: "hello.png",
      type: "image/png"
    });

    const ELMLAB = "http://192.168.31.60:8000/user_base/profile/detail/";
    const HOSTEL = "http://172.17.6.127:8000/user_base/profile/detail/";
    const CORE = "http://10.163.26.52:19000/user_base/profile/detail/";
    const profile_id = "1";
    const token = "Token ".concat(
      "966b2172505684bb4630ba62feea43531e173ec9523daf0b019728a671d27e51"
    );
    var ENDPOINT = HOSTEL.concat(profile_id);
    fetch(ENDPOINT, {
      method: "PUT",
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
        <Text style={styles.text}>Image Picker</Text>
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
          <TouchableOpacity style={styles.button} onPress={this._onSave}>
            <Text style={styles.buttonText}>Save</Text>
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
