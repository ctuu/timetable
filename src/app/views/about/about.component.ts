import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private navService: NavService
  ) { }

  ngOnInit() {
    this.navService.left = { icon: "menu", content: "关于", action: () => { } }
  }

}
