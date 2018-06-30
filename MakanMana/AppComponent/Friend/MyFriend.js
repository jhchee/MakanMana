import React from "react";

import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Constants } from "expo";
import { Container } from "native-base";
import CustomHeader from "../../UIComponent/CustomHeader";
import { Icon, SearchBar } from "react-native-elements";
import FriendDetail from "./FriendDetail";
import FriendBar from "./FriendBar";
import FriendSearchResult from "./FriendSearchResult";
import { createStackNavigator } from "react-navigation";

import { Provider } from "mobx-react";
import mobxstores from "../../mobxstores";

class MyFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      friendList: []
    };
  }
  _searchPerson = userName => {
    console.log("hello world");
    this.props.navigation.navigate("SearchResult", { searchTarget: userName });
  };
  fetchFriend = () => {
    const ELMLAB = "http://192.168.31.60:8000/user_base/friend/detail/";
    const HOSTEL = "http://172.17.6.127:8000/user_base/friend/detail/";
    // const CORE = "http://10.163.26.52:19000/user_base/friend/detail/";
    const CORE = "http://192.168.137.1:8000/user_base/friend/detail/";
    const MAXIS = "http://172.20.10.3:8080/user_base/friend/detail/";
    const user_id = "1";
    var ENDPOINT = "http://10.0.2.2:8000/user_base/friend/detail/".concat(
      user_id
    );
    fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        this.setState({ friendList: myJson.friend_list });
      });
  };
  componentDidMount() {
    this.fetchFriend();
  }
  _detailPage = id => {
    this.props.navigation.navigate("FriendDetail", { profileId: id });
  };
  render() {
    return (
      <Provider {...mobxstores}>
        <Container style={styles.container}>
          <CustomHeader
            title="Friend"
            drawerOpen={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <View style={styles.searchBar}>
            <SearchBar
              lightTheme
              showLoading={true}
              searchIcon={false}
              inputStyle={{ backgroundColor: "white" }}
              containerStyle={{
                backgroundColor: "white"
              }}
              cancelIcon={{ name: "cancel" }}
              clearIcon={{
                color: "#999",
                name: "cancel"
              }}
              placeholder="Search username"
              onChangeText={searchInput => this.setState({ searchInput })}
              ref={search => (this.search = search)}
              onSubmitEditing={() => {
                this._searchPerson(this.state.searchInput);
              }}
            />
          </View>
          <ScrollView>
            {this.state.friendList.map((ele, index) => {
              return (
                <FriendBar
                  friendInfo={ele}
                  key={index}
                  _detailPage={this._detailPage}
                  isFriend={1}
                />
              );
            })}
          </ScrollView>
        </Container>
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
  icon: {
    height: 24,
    width: 24
  },
  searchBar: {
    marginTop: 10
  }
});

export default (MyFriend = createStackNavigator(
  {
    FriendMenu: {
      screen: MyFriend
    },

    FriendDetail: {
      screen: FriendDetail
    },
    SearchResult: {
      screen: FriendSearchResult
    }
  },
  {
    // mode: "modal",
    headerMode: "none"
  }
));
// export default MyFriend;
