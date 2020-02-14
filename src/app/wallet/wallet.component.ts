import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private Auth: AuthService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  toDate(_in : any){
    try{
      return new Date(_in);
    }catch(e){
      return null;
    }
  }

}
