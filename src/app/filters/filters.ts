import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(options: string[], searchText: string): string[] {
    if (!options || !searchText) {
      return options;
    }
    searchText = searchText.toLowerCase();
    return options.filter(option =>
      option.toLowerCase().includes(searchText)
    );
  }
}
