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
import FriendBar from "./FriendBar";
import FriendDetail from "./FriendDetail";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";

import { Provider } from "mobx-react";
import mobxstores from "../../mobxstores";

class FriendSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResultList: [] };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const searchTarget = navigation.getParam("searchTarget");
    this._fetchSearchResult(searchTarget);
  }
  _detailPage = id => {
    this.props.navigation.navigate("FriendDetail", { profileId: id });
  };
  _fetchSearchResult = searchTarget => {
    console.log(searchTarget);
    var ENDPOINT = "http://10.0.2.2:8000/user_base/profile/list/?name=".concat(
      searchTarget
    );
    console.log(ENDPOINT);
    fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        this.setState({ searchResultList: myJson });
        // console.log(this.state.searchResultList);
      });
  };
  render() {
    return (
      <Provider {...mobxstores}>
        <View style={styles.container}>
          <ScrollView>
            {this.state.searchResultList.length ? (
              this.state.searchResultList.map((ele, index) => {
                return (
                  <FriendBar
                    friendInfo={ele}
                    key={index}
                    _detailPage={this._detailPage}
                  />
                );
              })
            ) : (
              <View style={styles.notFoundMessage}>
                <Text>User not found :(</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight
  },
  notFoundMessage: {
    marginTop: 20,
    alignItems: "center"
  }
});
export default (FriendSearchResult = createStackNavigator(
  {
    FriendSearchResult: {
      screen: FriendSearchResult
    },

    FriendDetail: {
      screen: FriendDetail
    }
  },
  {
    headerMode: "none"
  }
));
