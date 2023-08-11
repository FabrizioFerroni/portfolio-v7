import { Pipe, PipeTransform } from '@angular/core';
import { Content } from '@app/interfaces/Projects';

@Pipe({
  name: 'proyects',
})
export class ProyectsPipe implements PipeTransform {
  transform(
    proyects: Content[],
    page: number = 0,
    limit: number = 6,
    category: string = ''
  ): Content[] {
    if (category.length === 0) return proyects.slice(page, page + limit);

    const filteredCategory = proyects.filter((p) =>
      p.category.includes(category)
    );

    return filteredCategory.slice(page, page + limit);
  }
}
