import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'absoluteCurrency' })
export class AbsoluteCurrencyPipe implements PipeTransform {
  transform(value: number | null, code: string):string {
    let result = "";
    let curr = code=='EUR'?'€':'$';
    if (value != null ) {
      if (value >= 0)
        result = curr + " " + value;
      else
        result = "- " + curr + " " + -value;
    }
    return result;
  }
}
