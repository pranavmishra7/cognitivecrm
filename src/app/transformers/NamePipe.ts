import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectionName',
  standalone: true
})
export class NamePipe implements PipeTransform {

  transform(raw: string | null | undefined, formName?: string | null): string {
    if (!raw) return '';

    let name = raw.toLowerCase();

    // Remove all underscores → spaces temporarily for easier matching
    let clean = name.replace(/_/g, ' ').trim();

    if (formName) {
      // Convert form name → snake_case-like pattern
      const formPrefix = formName.toLowerCase().replace(/\s+/g, ' ').trim();

      // If section starts with form name prefix → remove it
      if (clean.startsWith(formPrefix)) {
        clean = clean.substring(formPrefix.length).trim();
      }
    }

    // Now convert remaining to capitalized words
    clean = clean.replace(/\s+/g, ' '); // collapse multiple spaces
    clean = clean.replace(/\b\w/g, c => c.toUpperCase());

    return clean;
  }
}
