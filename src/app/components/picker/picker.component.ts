import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DAYS } from '../../models/mock-day';
import 'hammerjs';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  @ViewChild('list', { static: false, read: ElementRef }) viewList: ElementRef;
  @Input() items = DAYS;
  @Input() selected: number
  @Output() selectedChange = new EventEmitter<number>();
  startY = 0
  offsetY = 0
  ticking = false

  reqAnimationFrame = (callback) => {
    window.setTimeout(callback, 1000 / 60);
  }


  handlePanMove = (e: any) => {
    // console.log(e.deltaY);
    // console.log(getComputedStyle(el).height);
    this.offsetY = this.startY + e.deltaY

    this.requestElementUpdate();
  }
  updateElementTransform = () => {
    // console.log(this.el)
    this.detect()
    this.setOffsetY(this.offsetY)
    this.ticking = false;
  }
  requestElementUpdate() {
    if (!this.ticking) {
      this.reqAnimationFrame(this.updateElementTransform);
      this.ticking = true;
    }
  }

  chHeight() {
    let child = this.viewList.nativeElement.children
    let ar = [0]
    for (const idx in child) {
      let i = parseInt(idx)
      ar.push(ar[i] + child[i].clientHeight)
      if (child[i] == this.viewList.nativeElement.lastElementChild)
        break
    }
    return ar
  }

  detect = () => {
    let child = this.viewList.nativeElement.children
    let ar = this.chHeight()
    let mid = this.viewList.nativeElement.parentElement.clientHeight / 2
    let min = Math.abs(mid - this.offsetY - ar[this.selected] - child[this.selected].clientHeight / 2)
    for (const idx in child) {
      let i = parseInt(idx)
      let tmp = Math.abs(mid - this.offsetY - ar[i] - child[i].clientHeight / 2)
      if (tmp < min) {
        this.selected = i
        this.selectedChange.emit(i)
        min = tmp
      }
      if (child[i] == this.viewList.nativeElement.lastElementChild)
        break
    }
    // console.log(`sel: ${this.selected}`)
    return mid - ar[this.selected] - child[this.selected].clientHeight / 2
  }

  handlePanEnd = (e) => {
    let child = this.viewList.nativeElement.children
    let mid = this.viewList.nativeElement.parentElement.clientHeight / 2
    let min = Math.abs(mid - this.offsetY - child[0].clientHeight / 2)
    // console.log(min)

    // this.detect()

    this.startY = this.detect()
    // console.log(`sel: ${this.selected}`)
    // console.log(this.startY)
    this.setOffsetY(this.startY)

  }
  setOffsetY(value: number) {
    let child = this.viewList.nativeElement.children
    let ar = this.chHeight()
    if (value > this.viewList.nativeElement.parentElement.clientHeight / 2 - this.viewList.nativeElement.firstElementChild.clientHeight / 2)
      return
    else if (value < this.viewList.nativeElement.parentElement.clientHeight / 2 - ar[child.length] - this.viewList.nativeElement.lastElementChild.clientHeight / 2)
      return
    this.viewList.nativeElement.style.transform = `translateY(${value}px)`;
  }
  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {
  }

  initPosition() {
    let ar = this.chHeight()
    let child = this.viewList.nativeElement.children
    let mid = this.viewList.nativeElement.parentElement.clientHeight / 2
    this.startY = mid - ar[this.selected] - child[this.selected].clientHeight / 2
    // this.startY = 
    this.setOffsetY(this.startY)
  }
  ngAfterViewInit() {
    this.initPosition()
    // console.log(this.viewList)
    // console.log(this.viewList.nativeElement.parentElement.clientHeight)
    var mc = new Hammer.Manager(this.viewList.nativeElement);
    mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 }));
    mc.on("panmove", this.handlePanMove);
    mc.on("panend", this.handlePanEnd);

  }
}
