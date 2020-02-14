import { Component } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery:any;
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { SetbetComponent } from './setbet/setbet.component';
import { TopupComponent } from './topup/topup.component';
import { WalletComponent } from './wallet/wallet.component'
import { BetslipComponent } from './betslip/betslip.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Naija Vegas'
  public isSideBarCollapsed = true
  public isMenuCollapsed = true
  firstName = ""
  lastName  = "Guest"
  role = "Guest"


  constructor(private Auth: AuthService, private modalService: NgbModal){
  }
  
  ngOnInit(){
  }

  ngAfterViewChecked() {
  }

  ngAfterContentChecked() {
  }

  ngDoCheck() {
    this.customPrep()
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
  
  replaceAll(str : string, search: string, replaceAllment: string) {
      return str.split(search).join(replaceAllment);
  }
  
  trimmer = function(str: string) {
      return str.toLowerCase().split(" ").join("");
  }

  signout(){
    this.Auth.signOut();
  }

  customPrep(){
    let blnk = document.getElementsByClassName('btn-lnk')
    let cbdy = document.getElementsByClassName('card-body')
    let nt = document.getElementsByClassName('navbar-toggler')
    for(var i = 0; i < blnk.length; i++){
      (blnk[i] as HTMLElement).style.width = "100%";
    }
    for(var i = 0; i < cbdy.length; i++){
      (cbdy[i] as HTMLElement).style.overflow = "scroll";
    }
    for(var i = 0; i < nt.length; i++){
      (nt[i] as HTMLElement).style.backgroundColor  = "#000000";
    }
    
    if(!this.isNullOrUndefinedOrEmpty(this.Auth.currentUser)){
      !this.isNullOrUndefinedOrEmpty(this.Auth.currentUser["displayName"]) ? this.firstName = this.Auth.currentUser["displayName"].split(" ")[0] : this.firstName = ""
      !this.isNullOrUndefinedOrEmpty(this.Auth.currentUser["displayName"]) ? this.lastName = this.Auth.currentUser["displayName"].split(" ")[1] : this.lastName = "Client"
    }

    this.role = "Guest"
    if(!this.isNullOrUndefinedOrEmpty(this.Auth.currentUser["roles"])){
      if(!this.isNullOrUndefinedOrEmpty(this.Auth.currentUser["roles"]["client"]) ){
        JSON.parse(""+this.Auth.currentUser["roles"]["client"]) ? this.role = "Client" : this.role = "Guest"
      }
      if(!this.isNullOrUndefinedOrEmpty(this.Auth.currentUser["roles"]["admin"]) ){
        JSON.parse(""+this.Auth.currentUser["roles"]["admin"]) ? this.role = "Admin" : this.role = "Guest"
      }
    }
  }

  setBet() {
    const modalRef = this.modalService.open(SetbetComponent);
    //modalRef.componentInstance.name = 'World';
    //modalRef.componentInstance.site = 'Naija Vegas';
  }

  topup() {
    const modalRef = this.modalService.open(TopupComponent);
    //modalRef.componentInstance.name = 'World';
    //modalRef.componentInstance.site = 'Naija Vegas';
  }

  openwallet(){
    const modalRef = this.modalService.open(WalletComponent);
    //modalRef.componentInstance.name = 'World';
    //modalRef.componentInstance.site = 'Naija Vegas';
  }

  openbetslip() {
    const modalRef = this.modalService.open(BetslipComponent);
    //modalRef.componentInstance.name = 'World';
    //modalRef.componentInstance.site = 'Naija Vegas';
  }

}
