import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let temp = new Date(value * 1000);
    // console.log(temp.getHours());
    // temp.setHours((temp.getHours() - (timezone/60)));
    // console.log(temp);
    // let time = temp.setTime( temp.getTime() + (temp.getTimezoneOffset()*60*1000) );
    // console.log(time);

    // let day = temp.getDate();
    let hour = temp.toLocaleString('en-US', { hour: 'numeric', hour12: true});
    // temp.setHours(temp.getUTCHours() - ((timezone / 60) * 2));
    return `${hour}`;
  }

}
