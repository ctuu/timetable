import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../models/event';
import { dayCN } from '../models/mock-day';

@Pipe({
  name: 'dayTime',
  pure: false
})

export class DayTimePipe implements PipeTransform {

  transform(value: Time, ...args: any[]): any {
    return `${dayCN[value.day]} ${value.start} - ${value.end}`
  }

}
