import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let temp = new Date(value * 1000);
    let month = months[temp.getMonth()];
    let day = temp.getDate();
    return `${month}/${day}`;
  }

}
