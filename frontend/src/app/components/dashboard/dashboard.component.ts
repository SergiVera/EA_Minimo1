import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  deleteUser(_id: string, i: number){
    if (confirm('Are yo sure you want to delete it?')){
      this.userService.deleteUser(_id)
        .subscribe(res=>{
          this.users.splice(i,1);
        },
          err => {
          console.log(err);
          });
    }
  }
  getUsers(){
    this.userService.getUsers()
      .subscribe(res=>{
        console.log(res)
        this.users = res as User[];
      });
  }

  updateUser(_id: string) {
    this.router.navigate(["/update", _id]);
  }

  registerNewUser() {
    this.router.navigateByUrl("/signup");
  }
}
