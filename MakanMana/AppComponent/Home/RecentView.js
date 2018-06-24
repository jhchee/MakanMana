import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

class RecentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "NAME",
      address: "ADDRESS"
    };
  }
  render() {
    return (
      <View style={styles.detailBox}>
        <TouchableOpacity>
          <View style={styles.details}>
            <Icon name="location-pin" type="entypo" color="white" size={35} />
            <View style={{ marginRight: 10 }}>
              <Text style={styles.placeName}>
                {this.state.name} {"\n"}
                <Text style={styles.placeAddress}>{this.state.address}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.breakLine} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailBox: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  details: {
    flexDirection: "row"
  },
  placeName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 10
  },
  placeAddress: {
    color: "white",
    fontSize: 15
  },
  breakLine: {
    marginTop: 20,
    height: 1,
    backgroundColor: "white"
  }
});

export default RecentView;
