import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  //@Input() name;
  //@Input() site;

  error = {
    code : "",
    message : ""
  }

  total_stake = 0;
  totalequalssum = true;
  sum_stake: number = 0;
  sum_payout: number = 0;

  stakes = {};
  payouts = {};

  constructor(private Auth: AuthService, public activeModal: NgbActiveModal, private router: Router) { 
  }

  ngOnInit() {
    
  }

  @HostListener('change', ['$event'])
  onChange(e) {
    //console.log(e);
    this.customPrep()
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    //console.log(e);
    this.customPrep()
  }

  ngDoCheck() {
    this.customPrep()
  }

  trimbase(root: string){
    let splt = root.split("/");
    splt = splt.reverse();
    splt.pop();
    let rt = splt.reverse().join(" - ")
    return(rt)
  }

  customPrep(){
    let zero_count = 0;
    this.sum_stake = 0;
    this.sum_payout = 0
    Object.keys(this.Auth.betslip).forEach((key) => {
      if(!this.stakes.hasOwnProperty(key)){
        this.stakes[key] = 0;
        this.payouts[key] = 0;
      }else{
        this.payouts[key] = this.stakes[key] * this.Auth.betslip[key].odds[this.Auth.betslip[key].choice];
        this.sum_payout = this.sum_payout + this.payouts[key];
      }
      if(!this.isPositiveReal(this.stakes[key])){
        //this.stakes[key] = 0
        zero_count = zero_count+1;
      }
      this.sum_stake = this.sum_stake + Number.parseFloat(this.stakes[key]);
    });

    if(Number.parseFloat(""+this.total_stake) > this.sum_stake){
      this.totalequalssum = true;
      Object.keys(this.stakes).forEach((key) => {
        if(!this.isPositiveReal(this.stakes[key])){
          this.stakes[key] = (this.total_stake - this.sum_stake) / zero_count
        }
      });
    }else{
      this.totalequalssum = false;
    }
  }

  isPositiveReal(_in: Number){
    if(Number.parseFloat(""+_in) == 0){
      return false;
    }else if(Number.parseFloat(""+_in) < 0){
      return false;
    }else if(Number.parseFloat(""+_in) == null){
      return false;
    }else if(Number.isNaN(Number.parseFloat(""+_in))){
      _in = 0;
      return false;
    }
    return true;
  }

  purchase_bets(event){
    event.preventDefault();
    let confirm_bets = {};
    if(!this.isPositiveReal(this.total_stake)){
      this.total_stake = this.sum_payout
    }
    Object.keys(this.Auth.betslip).forEach((key) => {
      if(this.isPositiveReal(this.stakes[key])){
        let bet = this.Auth.betslip[key];
        bet["stake"] = this.stakes[key];
        bet["payout"] = this.payouts[key];
        confirm_bets[key] = bet;
        confirm_bets["total_stake"] = this.sum_stake;
        confirm_bets["total_payout"] = this.sum_payout;
      }
    });
    if(!this.isNullOrUndefinedOrEmpty(confirm_bets)){
      if(this.isNullOrUndefinedOrEmpty(this.Auth.currentUser)){
        this.router.navigate(["signin"]);
        this.activeModal.close();
      }else{
        if(this.sum_payout > this.Auth.currentUser["balance"]){
          this.error.code = "payment/insufficient-funds"
          this.error.message = "You don't have enough funds to place bet(s)."
        }else{
          this.Auth.adduserbetslip(confirm_bets).then(() => {
            //this.router.navigate(["home"])
            this.activeModal.close();
          }).catch(err => {
            this.error = err;
          });
        }
      }
    }

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
