import { observable, action, computed, toJS } from "mobx";

class Personal {
  @observable username = "Dummy";
  @observable status = "Nothing";

  @action
  setUserName(username) {
    this.username = username;
  }
  @action
  setStatus(status) {
    this.status = status;
  }
}

export default Personal;
