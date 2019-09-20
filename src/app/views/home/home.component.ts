import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  visible;
  constructor(
    public coursesService: CoursesService,
    private navService: NavService) { }

  filter(rex) {
    for (const i in this.visible) {
      if (rex == "")
      {
        this.visible[i] = false
        continue;
      }
      this.visible[i] = !this.coursesService.events[i].summary.match(new RegExp(rex))
    }
  }

  add() {
    this.navService.goTo([`/event/${this.coursesService.add(this.coursesService.newEvent())}`])
  }

  ngOnInit() {
    this.navService.left = { icon: "menu", content: "课表", action: () => { } }
    this.visible = new Array<Boolean>(this.coursesService.events.length)
    this.visible.fill(false)
  }

}
