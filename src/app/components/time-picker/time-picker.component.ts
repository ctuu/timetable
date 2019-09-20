import { Component, OnInit, ViewChild, EventEmitter,ElementRef, Input, Output } from '@angular/core';
import { DAYS, HOURS, MINUTES } from '../../models/mock-day';
import { Time } from 'src/app/models/event';
@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  @ViewChild('wrapper', { static: false, read: ElementRef }) viewWrapper: ElementRef;

  daySel = 4
  startHourSel = 8
  startMinSel = 20
  endHourSel = 8
  endMinSel = 20
  days = DAYS
  startHours = HOURS
  endHours = HOURS
  startMinutes = MINUTES
  endMinutes = MINUTES

  @Input() time: Time;
  @Output() timeChange = new EventEmitter<Time>();

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.viewWrapper.nativeElement.style.transform = "translateY(100%)";
    this.viewWrapper.nativeElement.parentElement.style.opacity = "0";
    setTimeout(() => {
      this.visibleChange.emit(false);
    }, 350);
  }

  confirm() {
    this.time.day = this.daySel
    this.time.start = `${this.startHours[this.startHourSel].name}:${this.startMinutes[this.startMinSel].name}`
    this.time.end = `${this.endHours[this.endHourSel].name}:${this.endMinutes[this.endMinSel].name}`
    this.timeChange.emit(this.time)
    this.close()
  }

  moveListener = (e) => {
    e.preventDefault();
  }
  constructor() { }

  ngOnInit() {
    this.daySel = this.time.day
    let st = this.time.start.split(":")
    this.startHourSel = parseInt(st[0])
    this.startMinSel = parseInt(st[1])
    let et = this.time.end.split(":")
    this.endHourSel = parseInt(et[0])
    this.endMinSel = parseInt(et[1])
  }

  ngAfterViewInit() {
    // console.log(this.viewWrapper)
    this.viewWrapper.nativeElement.style.transform = "none";
    this.viewWrapper.nativeElement.parentElement.style.opacity = "1";
    document.body.addEventListener('touchmove', this.moveListener, { passive: false });
  }

  ngOnDestroy() {
    // this.viewWrapper.nativeElement.style.transform = "none";
    
    document.body.removeEventListener('touchmove', this.moveListener);
  }
}
