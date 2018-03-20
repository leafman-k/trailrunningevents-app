import delay from './delay';

const users = [
  {
    userId: 'admin',
    firstName: 'Anders',
    lastName: 'Admin',
    password: '3333',
    gender: 'manle',
    role: 'ADMIN'
  },
  {
    userId: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    password: '1111',
    gender: 'male',
    role: 'ATHLETE'
  },
  {
    userId: 'laracraft',
    firstName: 'Lara',
    lastName: 'Craft',
    password: '2222',
    gender: 'female',
    role: 'ATHLETE'
  }
];

class AuthApi {
  static signIn(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = users.find( user => user.userId === credentials.userName);
        if(user != undefined){
          if(user.password === credentials.password){
            console.log(Object.values(user));
            resolve({id: user.userId, firstName: user.firstName, lastName:user.lastName, role:user.role});
          }else {
            reject('User id or password does not match');
          }
        } else {
          reject('Check the credentials');
        }
      }, delay);
    });
  }
}
export default AuthApi;
