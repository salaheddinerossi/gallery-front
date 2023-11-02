import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private authService:AuthService,private router:Router) {
  }

  user:User={
    username:"",
    password:""
  };

  signup(){
    this.authService.register(this.user.username,this.user.password).subscribe(
        ()=>{
          this.router.navigate(['/login'])
        }
    )
  }

}
