import { Pipe, PipeTransform } from '@angular/core';
import { dayCN } from '../models/mock-day';
@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return dayCN[value];
  }

}
