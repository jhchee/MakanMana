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
    this.state = {};
  }
  render() {
    return (
      <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
        <TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Icon name="location-pin" type="entypo" color="white" size={35} />
            <View style={{ marginRight: 10 }}>
              <Text style={styles.title}>
                Name{"\n"}
                <Text style={styles.address}>
                  No19,Jalan Puteri Park 9, Taman Gaya 8, 81800, Ulu Tiram,
                  Johor Darul Takzim
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20, height: 1, backgroundColor: "white" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 10
  },
  address: {
    color: "white",
    fontSize: 15
  }
});

export default RecentView;
