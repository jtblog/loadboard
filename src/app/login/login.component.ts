import { Component, OnInit } from '@angular/core';
import { Loginschema } from '../core/loginschema';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = {
    code : "",
    message : ""
  }

  constructor(private Auth: AuthService, private router: Router) {}

  ngOnInit() {
    //console.log(this.Auth.user$)
  }

  //powers = ['Really Smart', 'Super Flexible',
  //          'Super Hot', 'Weather Changer'];

  schema = new Loginschema("user@example.com", "passky");

  loginUser(event){
    event.preventDefault()
    this.error = { code : "", message : "" }
  	const target = event.target
  	const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value
    this.Auth.signInWithEmail(email, password, null)
      .then((credential) => {
        //this.router.navigate(["home"])
      }).catch(err => {
        this.error = err;
      });
  }

  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

} 