import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user";
import {Environment} from "./environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  getUsers(){
    return this.http.get(this.environment.urlUser);
  }

  postUser(User: User){
    return this.http.post(this.environment.urlUser, User);
  }

  putUser(user: User){
    return this.http.put(this.environment.urlUser + `/${user._id}`, user);
  }

  deleteUser(_id: string){
    return this.http.delete(this.environment.urlUser + `/${_id}`);
  }

  getSingleUser(userId: string) {
    return this.http.get(this.environment.urlUser + `/${userId}`)
  }
}
