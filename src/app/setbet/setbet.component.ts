import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-setbet',
  templateUrl: './setbet.component.html',
  styleUrls: ['./setbet.component.css']
})
export class SetbetComponent implements OnInit {

  option = 1
  listed = true

  error = {
    code : "",
    message : ""
  }

  schema: any = {
    desc: "Sample description",
    photoURL: "",
    category: "Special Events",
    odds: {
      win: 0.00, 
      lose: this.option == 2 || this.option == 3 ? 0.00 : null,
      draw: this.option == 3 ? 0.00 : null 
    },
    results: "",
    choice: "",
    option: this.option,
    expiry: (new Date())
  }
  odds: any[];

  /*formGroup : FormGroup
  dateModel: Date = new Date()
  stringDateModel: string = new Date().toString()*/

  //@Input() name;
  //@Input() site;

  constructor(public activeModal: NgbActiveModal) {
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
    switch (this.option) {
      case 3:
        this.schema.odds.win = 0.00
        this.schema.odds.lose = 0.00
        this.schema.odds.draw = 0.00
        break;
      case 2:
        this.schema.odds.win = 0.00
        this.schema.odds.lose = 0.00
        this.schema.odds.draw = undefined
        break;
      case 1:
        this.schema.odds.win = 0.00
        this.schema.odds.lose = undefined
        this.schema.odds.draw = undefined
        break;
      default:
        break;
    }
  }

  tweekBet(event){
    this.error = { code : "", message : "" }
    if(this.schema.expiry.getTime() < (new Date()).getTime()){
      this.error = { code : "time/invalid", message : "Date and Time must be later than now" }
    }else{

    }
  }

}