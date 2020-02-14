import { Component, OnInit, Input, HostListener, Inject, Self } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

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

  self = function(){
    return this
  }

  confirmPayment = function(response){
    let trans = {}
    //let resp = JSON.parse(JSON.stringify(response));
    Object.keys(response).forEach((key) => {
      trans[key] = response[key]
    });
    this.addfunds(trans);
  }

  _config = {
    key : "pk_test_e7ea4eef9e85c26ac13c834a249f077a7d3780d4",
    email : "joetfx@hotmail.com",
    amount : 50,
    //container: 'paystackEmbedContainer',
    callback: this.confirmPayment.bind(this)
  }
 
  cancelledPayment = function() : any {
      //console.log('Closed');
  }
  
  constructor(private Auth: AuthService, public activeModal: NgbActiveModal, @Inject('Window') window: Window, private router: Router) { }

  ngOnInit() {
    if(this.isNullOrUndefinedOrEmpty(this.Auth.currentUser)){
      this.router.navigate(["signin"]);
      this.activeModal.close();
    }
  }

  ngDoCheck(){
    //this.name = "Me"
  }

  fundaccount(event){
    event.preventDefault();
    this.error = { code : "", message : "" };
    this._config["amount"] = this.amnt * 100;
    (<any>window).PaystackPop.setup(this._config).openIframe();
    /*let paymentEngine = (<any>window).RmPaymentEngine.init(this._config);
    paymentEngine.showPaymentWidget();*/
  }

  /*_config = {
    key: "am9ldGZ4QGhvdG1haWwuY29tfDQzMDA4MDEyfGVhNjQ2ZjFkNDkyOWVjMmVjNzRjODIwZmMxOTRjZTI5ZGZmODU2Y2VmZGE0NzM5Yzk5MjljM2RjYjc1NWJjNGEzMTUwNTMxNjgwZjlkOWFiOTJjNmZkYzY5N2RkODY4YWI0NDc0ZDNhODQwNmMyMzUzZWIzOTY1NDdmOTExZmUy",
    customerId: "140700251",
    firstName: "Obagbemisoye",
    lastName: "Temitope",
    email: "joetfx@hotmail.com",
    narration: "Naija Vegas",
    amount: "100",
    onSuccess: function (response) {
      console.log('callback Successful Response', response);
    },
    onError: function (response) {
      console.log('callback Error Response', response);
    }
  }*/

  addfunds(trans){
    trans["trans_type"] = "credit";
    trans["email"] = this._config["email"];
    trans["amount"] = (this._config["amount"] / 100 );
    trans["payer_id"] = this.Auth.currentUser["uid"];
    trans["payer"] = this.Auth.currentUser["displayName"];
    this.Auth.addusertransaction(trans).then(() => {
      //this.router.navigate(["home"])
      this.activeModal.close();
    }).catch(err => {
      this.error = err;
    });
  }

  isNullOrUndefinedOrEmpty(_in){
    switch(_in){
      case null:
        return true;
        break;
      case undefined:
        return true;
        break;
      case "null":
        return true;
        break;
      case "undefined":
        return true;
        break;
      case {}:
        return true;
        break;
      case []:
        return true;
        break;
      default:
        if(typeof _in == "string"){
          if(_in.trim() == "" || _in.split(" ").join("") == ""){
            return true;
          }else{
            return false;
          }
        }else if(typeof _in == "undefined"){
          return true;
        }else if(_in == {}){
          return true;
        }else if(JSON.stringify(_in) == "{}"){
          if(Object.keys(_in).length > 0 ){
            return false;
          }else{
            return true;
          }
        }else{
          return false;
        }
        break;
      }
  }

}
