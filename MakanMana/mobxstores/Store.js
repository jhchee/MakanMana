import { observable, action, computed, toJS } from "mobx";

class Store {
  @observable
  friendList = "lol";
  
  @action
  setFriendList(friendList) {
    this.friendList;
  }
}

export default Store;
