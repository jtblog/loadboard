import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { AuthService } from '../core/auth.service';
import { BetslipComponent } from '../betslip/betslip.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bets: any = {}
  sorter: any = {}
  rootpaths: any = []
  basepaths: any = []

  model = {
  };

  public isSideBarCollapsed = true;
  public isMenuCollapsed = true;
  //images = [62, 83, 466, 965].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = [];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  constructor(private Auth: AuthService, private modalService: NgbModal) {
    this.bets = this.Auth.bets;
    //console.log(this.bets)
    //console.log((new Date()).getTime())
    //new Date(1394104654000)
  }

  ngOnInit() {
    this.images.push('../assets/img/bonus.png')
    this.images.push('../assets/img/customer_call.png')
  }

  ngAfterViewChecked() {
  }

  ngAfterContentChecked() {
  }

  ngDoCheck() {
    this.customPrep()
  }

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  addtobetslip(event){
    //return(JSON.stringify(_in))
    event.preventDefault()
    const target = event.target
    let id = target.id.split("_")[0];
    let type = target.id.split("_")[1];
    let bet = this.bets[id]
    bet["choice"] = type
    this.Auth.addtobetslip(bet)
    const modalRef = this.modalService.open(BetslipComponent);
    //modalRef.componentInstance.name = 'World';
    //modalRef.componentInstance.site = 'Naija Vegas';
  }

  trimbase(root: string){
    let splt = root.split(" - ");
    splt = splt.reverse();
    //splt.pop();
    let rt = splt.reverse().join(" - ")
    return(rt)
  }

  customPrep(){
    Object.keys(this.bets).forEach((key) => {
      let ky = "";
      let arr0 = this.bets[key].category_path.split("/")
      for(let i = 0; i < arr0.length; i++){
        i == 0 ? ky = ky + this.bets[key].categories[i] : ky = ky + " - " + this.bets[key].categories[i]
        if(i == 0){
          if(!this.basepaths.includes(ky)){
            this.basepaths.push(ky)
            if(!this.model.hasOwnProperty(ky)){
              this.model[ky] = false
            }
          }
        }else if(i == this.bets[key].n_o_path-1){
          if(!this.rootpaths.includes(ky)){
            this.rootpaths.push(ky)
          }
        }

        if(this.sorter.hasOwnProperty(ky)){
          var arr = this.sorter[ky];
          if(!arr.includes(this.bets[key].id)){
            this.sorter[ky].push(this.bets[key].id)
          }
        }else{
          this.sorter[ky] = [this.bets[key].id]
        }
      }
    })

    /*let blnk = document.getElementsByClassName('btn-lnk')
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
    }*/
  }

}
