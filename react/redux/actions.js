import { createAction } from 'redux-actions';

// TODO properly docuemnt this class, very important
export default class ActionState {
  /**
   * @param {*} namespace, action namespace
   * intialize the class with  a proper entitiy name
   */
  constructor(namespace) {
    this.namespace = namespace;
    this.loading = `${this.namespace}/LOADING`;
    this.success = `${this.namespace}/SUCCESS`;
    this.error = `${this.namespace}/ERROR`;
    this.reset = `${this.namespace}/RESET`;
  }

  loadingAction() {
    return createAction(this.loading)();
  }

  successAction(payload) {
    return createAction(this.success)(payload);
  }

  errorAction(payload) {
    return createAction(this.error)(payload);
  }

  resetAction() {
    // dont call this create action, use this is needed as a fucntion
    return createAction(this.reset)();
  }
}
