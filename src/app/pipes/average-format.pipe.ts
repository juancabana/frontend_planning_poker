import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageFormat'
})
export class AverageFormatPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString('es', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

}
