import { observable, action, computed, toJS } from "mobx";

class Personal {
  @observable
  username = "Dummy";
  @observable
  status = "Nothing";
  @observable
  email = "chee@gmail.com";
  @observable
  token =
    "Token 9051234390498155ed49aea36c518a1df8d666a7aeb392d92dce1cb455d9ffd0";
  @observable
  profileId = "1";
  @action
  setUserName(username) {
    this.username = username;
  }
  @action
  setStatus(status) {
    this.status = status;
  }
  @action
  setStatus(email) {
    this.email = email;
  }
  @action
  setToken(token) {
    this.token = "Token ".concat(token);
  }
}

export default Personal;
