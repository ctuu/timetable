import { Component, OnInit, Input } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() toggleDrawer: () => {};
  constructor(
    public navService: NavService) { }

  ngOnInit() {
  }
}
