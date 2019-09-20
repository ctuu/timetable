import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freq'
})
export class FreqPipe implements PipeTransform {

  transform(freq: any, ...args: any[]): any {
    let duration = freq.end ? `${freq.start} - ${freq.end} 周` : `第 ${freq.start} 周`
    let itl = freq.end ? `，每${freq.interval > 1 ? freq.interval : ""}周` : ""
    return duration + itl
  }

}
