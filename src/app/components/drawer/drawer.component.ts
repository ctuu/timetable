import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { drawerAnimation } from 'src/app/animations';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [ drawerAnimation]
})
export class DrawerComponent implements OnInit {
  @ViewChild('drawer', { static: false, read: ElementRef }) viewDrawer: ElementRef;

  visible: boolean = false
  navList = [
    { text: `课表`, path: "/" },
    { text: `导入/导出`, path: "/import-export" },
    { text: `关于`, path: "/about" },
  ]
  constructor() { }

  toggle = ()=> {
    this.visible = !this.visible
    if (this.visible) {
      this.viewDrawer.nativeElement.parentElement.style.visibility = "visible";
      this.viewDrawer.nativeElement.parentElement.style.opacity = "1";
    }
    else {
      this.viewDrawer.nativeElement.parentElement.style.visibility = "hidden";
      this.viewDrawer.nativeElement.parentElement.style.opacity = "0";
    }
  }

  ngOnInit() {
  }

}
