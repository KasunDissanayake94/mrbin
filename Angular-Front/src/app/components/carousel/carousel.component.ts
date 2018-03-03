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
      { name: 'https://www.geospatialworld.net/wp-content/uploads/admincms/filemanager/connectors/ashx/images/smartcity.jpg' },
      { name: 'http://www.lgcnsblog.com/wp-content/uploads/2016/02/Fotolia_101697370_Subscription_Monthly_M.jpg' },
      { name: 'https://www.itu.int/en/ITU-T/climatechange/resources/Documents/shutterstock_154166135-%5BConverted%5D.png' },
      { name: 'http://www.china-iprhelpdesk.eu/sites/china-hd/files/public/Smart_City_Series_logo02_2.png' },

    ]
  }

  ngOnInit() {
  }

}
