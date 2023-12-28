import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(value: string): unknown {
    if (!value) return ''
    const cleanTxt = value.replace(/\s+/g, '');
    return cleanTxt.substring(0, 2).toUpperCase()
  }

}
