import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  user:User={
    id:"",
    username:"",
    password:""
  }
  errorMessage: string | null = null;
  constructor(private authService:AuthService,private router:Router) {
  }

  onLogin(){
    this.loading = true;
    this.authService.login(this.user.username,this.user.password).subscribe(
      user => {
        if(user){
          this.loading = false;
          this.router.navigate(['/'])
        }else{
          this.errorMessage = "Invalid username or password"
        }
      },error => {
        this.errorMessage="An error occurred. Please try again."
        this.loading = false;
      }
    )
  }

}
