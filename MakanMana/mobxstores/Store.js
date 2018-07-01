import { observable, action, computed, toJS } from "mobx";

class Store {
  @observable userId = 1;
  @observable baseUrl = "http://10.0.2.2:8000/user_base/";
  @observable friendList = [];

  @action
  setFriendList(friendList) {
    this.friendList = friendList;
  }

  @action
  updateFriendList() {
    ENDPOINT = this.baseUrl.concat("friend/detail/").concat(this.userId);
    fetch(ENDPOINT)
      .then(function(response) {
        return response.json();
      })
      .then(jsonResult => {
        this.friendList = jsonResult.friend_list;
      });
  }

  // @computed
  // get friendList() {
  //   return this.friendList;
  // }
}

export default Store;
