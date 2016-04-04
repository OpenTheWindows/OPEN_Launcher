import {Observable} from 'rxjs/Rx';

import {User} from '../../shared/models/User';
import {IUserService} from '../services/UserService';

export class UserServiceMock implements IUserService {
  static getTestUser(name: string) {
    var user = new User();
    user.name = name;
    user.profileImg = 'profileImg';
    return user;
  }

  static getAllUsers(user: User): User[] {
    var allUsers: User[] = new Array<User>();
    allUsers[0] = UserServiceMock.getTestUser('user1');
    allUsers[1] = UserServiceMock.getTestUser('user2');
    allUsers[2] = user;
    return allUsers;
  }

  addUser(user: User) {
    return Observable.of(JSON.parse(''));
  }

  deleteUser(name) {
    var allUsers: User[] = new Array<User>();
    allUsers[0] = UserServiceMock.getTestUser('user1');
    return Observable.of(allUsers);
  }

  getAllUsers(): Observable<User[]> {
    var allUsers: User[] = new Array<User>();
    var users = '[{"name": "user1"}, {"name": "user2"}]';
    var obj = JSON.parse(users);
    return Observable.of(obj);
  }

  getUserByName(username: string): Observable<User[]> {
    return this.getAllUsers();
  }
}
