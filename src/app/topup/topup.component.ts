import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {

  amnt = 50

  error = {
    code : "",
    message : ""
  }

  confirmPayment = function(response: object) : any{
    console.log(response);
  }
 
  cancelledPayment = function() : any {
      //console.log('Closed');
  }
 
  generateReference(): string {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 20; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }

  constructor(public activeModal: NgbActiveModal, @Inject('Window') window: Window) { }

  ngOnInit() {
    
  }

  ngDoCheck(){
    //this.name = "Me"
  }

  fundaccount(event){
    event.preventDefault();
    this.error = { code : "", message : "" };
    this._config["amount"] = this.amnt * 100;
    (<any>window).PaystackPop.setup(this._config).openIframe();
  }

  _config = {
    key : "pk_test_e7ea4eef9e85c26ac13c834a249f077a7d3780d4",
    email : "joetfx@hotmail.com",
    amount : 50,
    //container: 'paystackEmbedContainer',
    callback: this.confirmPayment
  }


}
