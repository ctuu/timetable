import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { NavService } from 'src/app/services/nav.service';
import { Event } from '../../models/event';

import * as LZString from 'lz-string';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {
  message: string
  dateValid: boolean

  export(date: string, events: Event[]) {
    let content = this.coursesService.export(date, events)
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    aLink.download = `kebiao-${date}.ics`;
    aLink.href = URL.createObjectURL(blob);

    aLink.click()
    URL.revokeObjectURL(aLink.href)
  }
  validate(e) {
    this.dateValid = Date.parse(e) ? true : false
  }
  importText(e: string) {
    try {
      let events = this.coursesService.decode(LZString.decompressFromEncodedURIComponent(e))
      let ct = this.coursesService.append(events)
      this.message = `成功导入 ${ct} 门课程`
    }
    catch (err) {
    }
    // console.log(ct)

  }
  exportText(events: Event[]) {
    let a = this.coursesService.encode(events)
    let b = LZString.compressToEncodedURIComponent(a)
    return b
  }

  constructor(
    public coursesService: CoursesService,
    private navService: NavService) { }


  ngOnInit() {
    this.navService.left = { icon: "menu", content: `导入 / 导出`, action: () => { } }
  }

}
