import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {passValidator} from "./validator";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  /**
   * Hide password
   */
  hide = true;

  registerForm: FormGroup;

  validation_messages: any;

  disabled = false;
  ShowFilter = false;
  interests: string[] = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  gender: String[];
  /**
   * true or false if the http rsponse code is 500 or not
   */
  error: boolean;
  /**
   * User to fill when its update
   */
  user: User;

  constructor(private authService: AuthService,
              private router: Router, private formBuilder: FormBuilder,
              private activatedRouter: ActivatedRoute, private userService: UserService) {

    this.user = new User();

    this.registerForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required])),

        surname: new FormControl('', Validators.compose([
          Validators.required])),

        username: new FormControl('', Validators.compose([
          Validators.required])),

        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),

        password: new FormControl('', Validators.compose([
          Validators.required])),

        confirmPassword: ['', passValidator],

        gender: new FormControl('', Validators.compose([
          Validators.required])),

        birthday: new FormControl('', Validators.compose([
          Validators.required])),

        interests: new FormControl('', Validators.compose([
          Validators.required])),

        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])),

        aboutme: new FormControl('')
      }
    )
  }

  ngOnInit() {

    this.validation_messages = {
      'name': [
        {type: 'required', message: 'Name is required'}
      ],
      'surname': [
        {type: 'required', message: 'Surname is required'}
      ],
      'username': [
        {type: 'required', message: 'Username is required'},
        {type: 'unique', message: 'Username already exists'}
      ],
      'email': [
        {type: 'required', message: 'Email is required'},
        {type: 'unique', message: 'Email already exists'},
        {
          type: 'pattern',
          message: 'It must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long'
        }
      ],
      'password': [
        {type: 'required', message: 'Password is required'}
      ],
      'confirmPassword': [
        {type: 'required', message: 'Password is required and both must match'}
      ],
      'birthday': [
        {type: 'required', message: 'Birthday is mandatory'}
      ],
      'gender': [
        {type: 'required', message: 'Gender is mandatory'}
      ],
      'interests': [
        {type: 'required', message: 'Interests are required'},
        {type: 'valid', message: 'Choose valid interests'}
      ],
      'phone': [
        {type: 'required', message: 'Telephone is mandatory'},
        {type: 'pattern', message: 'It has to be a valid number'}
      ]
    };

    this.interests = ['Pasta', 'Meat', 'Fish', 'Italian', 'Mexican'];

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };

    this.gender = ['Male', 'Female', 'Other'];

    this.activatedRouter.params.subscribe(params => {
      if (typeof params['userId'] !== 'undefined') {
        this.user._id = params['userId'];
        this.getSingleUser(this.user._id);
      } else {
        this.user._id = '';
      }
    });
  }

  getSingleUser(userId: string) {
    this.userService.getSingleUser(userId)
      .subscribe(res =>{
        this.user= res as User;
        console.log(this.user);
        for (let i = 0; i < this.user.interests.length; i++) {
          this.selectedItems[i] = this.user.interests[i];
        }
        console.log(this.selectedItems);
      }, err => {
        console.log(err);
      });
  }

  /**
   * The following four functions are related to the dropDown
   */
  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems[this.selectedItems.length] = item;
    console.log(this.selectedItems);
  }

  onItemDeselect(item: any) {
    const index = this.selectedItems.indexOf(item, 0);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
    console.log(this.selectedItems);
  }

  onSelectAll(item: any) {
    this.selectedItems = item;
    console.log(this.selectedItems);
  }

  deSelectAll() {
    this.selectedItems = [];
    console.log(this.selectedItems);
  }

  /**
   * Function that is called when the user taps the Register button
   */
  register() {
    console.log(this.registerForm.value);
    let user = new User();
    user.name = this.registerForm.value.name;
    user.surname = this.registerForm.value.surname;
    user.username = this.registerForm.value.username;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;
    user.gender = this.registerForm.value.gender;
    user.birthday = this.registerForm.value.birthday;
    for (let i = 0; i < this.selectedItems.length; i++) {
      user.interests[i] = this.registerForm.value.interests[i];
    }
    user.phone = this.registerForm.value.phone;
    user.aboutme = this.registerForm.value.aboutme;
    console.log(user);
    this.authService.signup(user)
      .subscribe(
        res => {
          console.log(res);
          if (localStorage.getItem('token')){
            this.router.navigateByUrl("/dashboard");
          } else {
            this.router.navigateByUrl("/");
          }
        },
        err => {
          console.log(err);
          this.handleError(err);
        });
  }


  /**
   * Handle de errors in responses
   * @param err We pass the error
   */
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    if (err.status === 500) {
      this.error = true;
      if (err.error.name === "ValidationError") {
        this.registerForm.get('interests').setErrors({valid: true});
      }
    } else if (err.status === 409) {
      var splitted = err.error.err.split("index: ");
      var key = splitted[1].split("_1");
      this.registerForm.get(key[0]).setErrors({unique: true});
    }
  }

  /**
   * Function that is called when the user taps the update button
   */
  updateUser(){
    this.userService.putUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl("/dashboard");
        },
        err => {
          console.log(err);
          this.handleError(err);
        }
      )
  }

  cancel(){
    if(localStorage.getItem('token')) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
