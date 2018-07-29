import { observable, action, computed, toJS } from "mobx";

class Personal {
  @observable username = "Hello World";

  @action
  setusername(username) {
    this.username = username;
  }
}

export default Personal;
