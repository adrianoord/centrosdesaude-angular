import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telformat'
})
export class TelFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    const RegExp = [
      /(\d{2})(\d{2})(\d{4,5})(\d{4})/g,
      /(\d{2})(\d{4,5})(\d{4})/g,
      /(\d{4,5})(\d{4})/g
    ]
    if(RegExp[0].test(value))
      return value.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/g, "($2) $3-$4");

    if(RegExp[1].test(value))
      return value.replace(/(\d{2})(\d{4,5})(\d{4})/g, "($1) $2-$3");

    if(RegExp[2].test(value))
      return value.replace(/(\d{4,5})(\d{4})/g, "$1-$2");
    
    return value
  }

}
