import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Betschema, Odds } from '../core/betschema';
//import * as jsonPath from 'jsonpath';

@Component({
  selector: 'app-setbet',
  templateUrl: './setbet.component.html',
  styleUrls: ['./setbet.component.css']
})
export class SetbetComponent implements OnInit {

  option = 1
  listed = true

  //categories: any = {}

  error = {
    code : "",
    message : ""
  }

  odds : Odds = {
    win: 0.00, 
    lose: this.option == 2 || this.option == 3 ? 0.00 : 0.00,
    draw: this.option == 3 ? 0.00 : 0.00 
  }

  schema : Betschema = {
    desc: "Sample description",
    photoURL: "", 
    category_path: "Awards/Oscars/Best Picture", 
    odds: this.odds,
    results: {},
    choice: "",
    option: this.option,
    expiry: (new Date()),
    categories: []
  };

  /*formGroup : FormGroup
  dateModel: Date = new Date()
  stringDateModel: string = new Date().toString()*/

  //@Input() name;
  //@Input() site;

  constructor(private Auth: AuthService, public activeModal: NgbActiveModal) {
    //this.categories = this.Auth.categories
    //console.log(this.getChildren(this.categories, "Awards/BAFTAs"));
  }

  ngOnInit(){
  }

  ngDoCheck(){
    //this.name = "Me"
  }
  
  ngAfterViewInit() {
    this.updateSchema()
  }

  @HostListener('change', ['$event'])
  onChange(e) {
    //console.log(e);
    this.updateSchema()
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    //console.log(e);
    this.updateSchema()
  }

  updateSchema(): void {
    this.schema.option = this.option
    let _grp = this.schema.category_path.split("/")
    let arr = []
    for(let i = 0; i < _grp.length; i++){
      arr.push(_grp[i]);
    }
    this.schema.categories = arr;
    this.schema.n_o_path = this.schema.categories.length;
    this.schema.no_of_subscribers = 0;
  }

  tweekBet(event){
    event.preventDefault()
    this.error = { code : "", message : "" }
    if(this.schema.expiry.getTime() < (new Date()).getTime()){
      this.error = { code : "time/invalid", message : "Date and Time must be later than now" }
    }else{
      this.Auth.setBet(this.schema).then((ref) => {
        this.activeModal.close();
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  getChild(jsonObject, children: any[]){
    let obj = null
    for(let i = 0; i < children.length; i++){
      if(jsonObject.hasOwnProperty(children[i])){
        obj = jsonObject[children[i]]
      }else{
        if(i == children.length-1){
          obj = null;
        }
      }
    }
    /*Object.keys(jsonObject).forEach((key) => {
    })*/
    return obj
  }

  isNullOrUndefinedOrEmpty(_in){
    switch(_in){
      case null:
        return true;
        break;
      case undefined:
        return true;
        break;
      case
       "null":
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

  /*getChildren(jsonObject, strg){
    let obj = jsonObject;
    var paths = strg.split("/");
    for(let i = 0; i < paths.length; i++){
      if(this.isNullOrUndefinedOrEmpty(obj)){
        if(obj.hasOwnProperty(paths[i])){
          obj = obj[paths[i]]
        }else{
          /*(i == paths.length-1){}/*
          obj = null;
        }
      }
    }
    return obj;
  }*/

}