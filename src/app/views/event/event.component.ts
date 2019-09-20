import { Component, OnInit } from '@angular/core';
import { Freq, Event } from 'src/app/models/event';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: number
  event: Event

  constructor(
    private navService: NavService,
    private route: ActivatedRoute,
    public coursesService: CoursesService) {

  }

  add() {
    this.navService.goTo([`/event/${this.id}/edit/${this.coursesService.addSection(this.id, this.coursesService.newSection())}`])
  }

  equalFreq(a: Freq, b: Freq) {
    return a.start != b.start || a.end != b.end || a.interval != b.interval
  }


  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id >= this.coursesService.events.length) {
      this.navService.goTo([``])
      this.event = this.coursesService.newEvent()
      return
    }
    else
      this.event = this.coursesService.events[this.id]

    this.coursesService.sortSection(this.id)

    this.navService.left = { icon: "arrow_back", content: "返回", action: () => { this.navService.goTo([`/`]) } }

    this.navService.right = {
      icon: "delete", content: "", action: () => {
        this.navService.goBack()
        this.coursesService.delete(this.event)
      }
    }
  }

  ngOnDestroy() {
    if (this.event.summary == "")
      this.event.summary = "未命名课程"
    this.navService.right = undefined
  }
}
