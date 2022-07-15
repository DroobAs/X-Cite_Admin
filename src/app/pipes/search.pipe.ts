import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], filterText: string) {
    return filterText.length > 2
      ? value.filter((x) =>
          x.fullName.toLowerCase().includes(filterText.toLowerCase())
        )
      : value;
  }
}
