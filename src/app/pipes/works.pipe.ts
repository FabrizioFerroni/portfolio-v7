import { Pipe, PipeTransform } from '@angular/core';
import { Work } from '@app/interfaces/Works';

@Pipe({
  name: 'works',
})
export class WorksPipe implements PipeTransform {
  transform(works: Work[], page: number = 0, limit: number = 3): Work[] {
    return works.slice(page, page + limit);
  }
}
