import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  items: Array<any> = []

  constructor() {
    this.items = [
      { name: 'http://ecohome-ngo.by/wp-content/uploads/2017/12/Being-Environmental-Reasons.jpg' },
      { name: 'https://38bjca3v17mc3pgaacmxp491-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/Energy-efficiency-3-e1455869864395.jpg' },
      { name: 'https://www.isemag.com/wp-content/uploads/2016/08/0916_ATT_1402x672.png' },
      { name: 'http://www.obecne-noviny.sk/uploads_article/102822/Greencityillustration201206_ATjgk_1507063145.jpg' },


    ]
  }

  ngOnInit() {
  }

}
