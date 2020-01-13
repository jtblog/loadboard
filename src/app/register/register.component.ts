import { Component, OnInit } from '@angular/core';
import { Registerschema } from '../core/registerschema';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isSideBarCollapsed = true;
  public isMenuCollapsed = true;

  error = {
    code : "",
    message : ""
  }
  schema = new Registerschema("type", "here", "+234", "user@example.com", "passke", "passk");
  
  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
    //console.log(this.Auth.user$)
  }

  registerUser(event){
    event.preventDefault()
    this.error = { code : "", message : "" }
    this.Auth.createUserWithEmailAndPassword(this.schema.email, this.schema.password)
      .then((UserCredential) => {
        this.Auth.signInWithEmail(this.schema.email, this.schema.password, this.schema)
          .then((credential) => {
          }).catch(err => {
            this.error = err;
          });
      }).catch(err => {
        this.error = err;
      });
  }

}
