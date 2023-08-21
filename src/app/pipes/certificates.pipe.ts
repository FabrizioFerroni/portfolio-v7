import { Pipe, PipeTransform } from '@angular/core';
import { Certificate } from '@app/interfaces/Certificates';

@Pipe({
  name: 'certificates',
})
export class CertificatesPipe implements PipeTransform {
  transform(
    certificates: Certificate[],
    page: number = 0,
    limit: number = 3
  ): Certificate[] {
    return certificates.slice(page, page + limit);
  }
}
