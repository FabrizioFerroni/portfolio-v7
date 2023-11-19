import { Pipe, PipeTransform } from '@angular/core';
import { Proyect } from '@app/interfaces/Projects';

@Pipe({
  name: 'proyects',
})
export class ProyectsPipe implements PipeTransform {
  transform(
    proyects: Proyect[],
    page: number = 0,
    limit: number = 6,
    category: string = ''
  ): Proyect[] {
    if (category.length === 0) return proyects.slice(page, page + limit);

    const filteredCategory = proyects.filter((p) =>
      p.categoria.includes(category)
    );

    return filteredCategory.slice(page, page + limit);
  }
}
