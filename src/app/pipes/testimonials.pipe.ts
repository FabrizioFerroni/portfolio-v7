import { Pipe, PipeTransform } from '@angular/core';
import { Testimonial } from '@app/interfaces/Testimonials';

@Pipe({
  name: 'testimonials',
})
export class TestimonialsPipe implements PipeTransform {
  transform(
    testimonials: Testimonial[],
    page: number = 0,
    limit: number = 3
  ): Testimonial[] {
    return testimonials.slice(page, page + limit);
  }
}
