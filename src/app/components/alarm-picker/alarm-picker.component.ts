import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { HOURS, MINUTES } from '../../models/mock-day';
import { Alarm } from 'src/app/models/event';
@Component({
  selector: 'app-alarm-picker',
  templateUrl: './alarm-picker.component.html',
  styleUrls: ['./alarm-picker.component.scss']
})
export class AlarmPickerComponent implements OnInit {
  @ViewChild('wrapper', { static: false, read: ElementRef }) viewWrapper: ElementRef;
  hourSel = 0
  minSel = 20
  hours = HOURS
  minutes = MINUTES

  @Input() time: Alarm;
  @Output() timeChange = new EventEmitter<Alarm>();

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.viewWrapper.nativeElement.style.transform = "translateY(100%)";
    this.viewWrapper.nativeElement.parentElement.style.opacity = "0";
    setTimeout(() => {
      this.visibleChange.emit(false);
    }, 350);
  }

  confirm() {
    this.time.hour = this.hourSel
    this.time.min = this.minSel
    this.timeChange.emit(this.time)
    this.close()
  }

  moveListener = (e) => {
    e.preventDefault();
  }

  constructor() { }

  ngOnInit() {
    this.hourSel = this.time.hour
    this.minSel = this.time.min
  }

  ngAfterViewInit() {
    this.viewWrapper.nativeElement.style.transform = "none";
    this.viewWrapper.nativeElement.parentElement.style.opacity = "1";
    document.body.addEventListener('touchmove', this.moveListener, { passive: false });
  }

  ngOnDestroy() {
    document.body.removeEventListener('touchmove', this.moveListener);
  }
}
