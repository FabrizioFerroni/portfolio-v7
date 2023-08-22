import { Pipe, PipeTransform } from '@angular/core';
import { Academy } from '@app/interfaces/Academys';

@Pipe({
  name: 'academys',
})
export class AcademysPipe implements PipeTransform {
  transform(
    academys: Academy[],
    page: number = 0,
    limit: number = 3
  ): Academy[] {
    return academys.slice(page, page + limit);
  }
}
