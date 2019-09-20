import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Section } from 'src/app/models/event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  section: Section;
  timeToggle: boolean = false
  alarmToggle: boolean = false
  alarmChecked: boolean
  freqChecked: boolean

  toggleAlarm(e) {
    if (e.target.checked)
      this.section.time.alarm = { hour: 0, min: 30 }
    else
      this.section.time.alarm = undefined
  }

  toggleFreq(e) {
    if (e.target.checked) {
      this.section.freq.end = this.section.freq.start
      this.section.freq.interval = 1
    }
    else
      this.section.freq.end = undefined
  }

  constructor(private navService: NavService,
    private route: ActivatedRoute,
    public coursesService: CoursesService) {

  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const sid = +this.route.snapshot.paramMap.get('sid');
    if (id >= this.coursesService.events.length) {
      this.navService.goTo([``])
      this.section = this.coursesService.newSection()
    }
    else if (sid >= this.coursesService.events[id].section.length) {
      this.navService.goTo([`/event/${id}`])
      this.section = this.coursesService.newSection()
    }
    else
      this.section = this.coursesService.events[id].section[sid]

    this.alarmChecked = this.section.time.alarm != undefined
    this.freqChecked = this.section.freq.end != undefined

    this.navService.left = { icon: "arrow_back", content: "返回", action: () => { this.navService.goTo([`/event/${id}`]) } }
    this.navService.right = {
      icon: "delete", content: "", action: () => {
        this.navService.goBack()
        this.coursesService.deleteSection(id, this.section)
      }
    }
  }
  ngOnDestroy() {
    this.navService.right = undefined
  }
}
