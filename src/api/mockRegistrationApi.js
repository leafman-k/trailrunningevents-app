import delay from './delay';


class AuthorApi {

  static registerToEvent(registration){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO Simulate server-side validation

        resolve(registration);
      }, delay);
    });
  }

  static cancelRegistration(eventId){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO Simulate server-side validation

        resolve(eventId);
      }, delay);
    });
  }
}

export default AuthorApi;
