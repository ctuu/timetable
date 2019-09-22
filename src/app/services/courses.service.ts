import { Injectable } from '@angular/core';
import { EVENTS } from '../models/mock-events';
import { Event, Section, Time, Freq } from '../models/event';
import { calendarAdapter } from '../models/calendar-adapter';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  events: Event[] = EVENTS;

  encode(e: Event[]): string {
    return Event.encodes(e)
  }

  decode(e: string): Event[] {
    return Event.decodes(e)
  }

  export(date: string, events: Event[]): string {
    return `${calendarAdapter(new Date(date), events)}`
  }

  sortSection(id: number) {
    this.events[id].section.sort((a, b) => {
      return Section.compare(a, b)
    })
  }

  changeSection(id: number) {
    this.sortSection(id)
  }

  add(e: Event): number {
    return this.events.push(e) - 1
  }

  append(e: Event[]): number {
    let ct = 0
    try {
      for (const i of e) {
        this.events.push(i)
        ++ct
      }
    } catch (err) {
      console.log(err)

    }
    return ct
  }

  delete(e: Event) {
    this.events = this.events.filter(h => h !== e);
  }

  deleteSection(id: number, e: Section) {
    this.events[id].section = this.events[id].section.filter(h => h != e)
  }

  addSection(id: number, e: Section): number {
    this.events[id].section.push(e)
    // this.changeSection(id)

    return this.events[id].section.length - 1
  }

  newEvent(): Event {
    return new Event("", "", [])
  }

  newSection(): Section {
    return new Section(
      new Time("08:00", "10:00", 1), "", new Freq(1)
    )
  }

  constructor() { }
}
