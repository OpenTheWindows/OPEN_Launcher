import {Injectable, bind} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './GlobalService';

import {User} from '../models/User';

export interface IUserService {
  getAllUsers(): Observable<User[]>;
  getUserByName(name: string): Observable<User[]>;
  addUser(user: User): Observable<User[]>;
  deleteUser(name): Observable<User[]>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private http: Http, private globalService: GlobalService) { }

  // Get all users from db
  getAllUsers(): Observable<User[]> {
    return this.http.get(this.globalService.URL_GETALLUSERS)
      .map((res: Response) => <User[]>res.json());
  }

  // Get user filtered by name from db
  getUserByName(name: string): Observable<User[]> {
    return this.http.get(this.globalService.URL_GETUSER(name))
      .map((res: Response) => <User[]>res.json());
  }

  // Add new user to db
  addUser(user: User): Observable<User[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.globalService.URL_ADDUSER,
      JSON.stringify(user),
      { headers: headers })
      .map((res: Response) => <User[]>res.json());
  }

  // Delete user by name from db
  deleteUser(name): Observable<User[]> {
    return this.http.get(this.globalService.URL_DELETEUSER(name))
      .map((res: Response) => <User[]>res.json());
  }
}

export let userServiceInjectables: Array<any> = [
  bind(UserService).toClass(UserService)
];
