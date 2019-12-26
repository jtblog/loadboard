import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isSideBarCollapsed = true;
  public isMenuCollapsed = true;

  constructor() { }

  ngOnInit() {
    this.tweek_styles()
  }

  ngAfterViewChecked() {
    this.tweek_styles()
  }

  ngAfterContentChecked() {
    this.tweek_styles()
  }

  ngDoCheck() {
    this.tweek_styles()
  }

  tweek_styles(){
    let blnk = document.getElementsByClassName('btn')
    let cbdy = document.getElementsByClassName('card-body')
    for(var i = 0; i < blnk.length; i++){
      (blnk[i] as HTMLElement).style.width = "100%";
    }
    for(var i = 0; i < cbdy.length; i++){
      (cbdy[i] as HTMLElement).style.overflow = "scroll";
    }
  }


  images = [62, 83, 466, 965].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

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

}
