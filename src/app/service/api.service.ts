import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Academys } from '@app/interfaces/Academys';
import { Certificates } from '@app/interfaces/Certificates';
import { Contact } from '@app/interfaces/Contact';
import { Cv } from '@app/interfaces/Cv';
import { Mensaje } from '@app/interfaces/Mensaje';
import { Proyects } from '@app/interfaces/Projects';
import { Testimonials } from '@app/interfaces/Testimonials';
import { Works } from '@app/interfaces/Works';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = '';
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  downloadCertificates(urlPDF: string): Observable<Blob> {
    return this.http.get(urlPDF, { responseType: 'blob' });
  }

  downloadCv(urlPDF: string): Observable<Blob> {
    return this.http.get(urlPDF, { responseType: 'blob' });
  }

  getAcademys(): Observable<Academys> {
    return this.http.get<Academys>(`${this.url}/estudios`);
  }

  getCertificates(): Observable<Certificates> {
    return this.http.get<Certificates>(`${this.url}/certificados`);
  }

  getCv(): Observable<Cv> {
    return this.http.get<Cv>(`${this.url}/cv`);
  }

  getProyects(): Observable<Proyects> {
    return this.http.get<Proyects>(`${this.url}/proyectos`);
  }

  getTestimonials(): Observable<Testimonials> {
    return this.http.get<Testimonials>(`${this.url}/testimonios`);
  }

  getWorks(): Observable<Works> {
    return this.http.get<Works>(`${this.url}/trabajos`);
  }

  postContact(data: Contact): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.url}/contacto`, data);
  }

  postDownload(cvId: number): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.url}/descargas-cv/${cvId}`, {});
  }
}
