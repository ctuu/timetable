import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/app/models/event';
@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit {
  ar: boolean[]

  @Input() events: Event[];

  constructor() { }

  selectAll(ar: boolean[]) {
    return ar.filter((e) => { return e == true }).length == ar.length
  }
  selectNone(ar: boolean[]) {
    return ar.filter((e) => { return e == true }).length == 0
  }

  toggle() {
    if (this.selectAll(this.ar)) {
      for (const i in this.ar)
        this.ar[i] = false
    }
    else {
      for (const i in this.ar)
        this.ar[i] = true
    }
  }

  ngOnInit() {
    this.ar = new Array<boolean>(this.events.length)
    this.ar.fill(true)
  }
  selected() {
    return this.events.filter((e, idx) => {
      return this.ar[idx]
    })
  }

}
