import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alarm',
  pure: false
})
export class AlarmPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return `提前 ${value.hour > 0 ? `${value.hour} 小时 `: ""}${value.min} 分`;
  }

}
