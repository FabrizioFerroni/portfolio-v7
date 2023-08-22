import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Certificate, Certificates } from '@app/interfaces/Certificates';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates!: Certificates;
  certificate: Certificate[] = [];
  page!: number;
  limit!: number;

  constructor(private http: HttpClient) {
    this.page = 0;
    if (this.isMobile()) {
      this.limit = 1;
    } else {
      this.limit = 3;
    }
  }

  ngOnInit(): void {
    this.getAllCertificates();
  }
  get(): Observable<Certificates> {
    return this.http.get<Certificates>('../../../assets/db/certificates.json');
  }

  getAllCertificates(): void {
    this.get().subscribe(
      (data) => {
        this.certificates = data;
        this.certificate = data.certificates;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get totalItems(): number {
    return this.certificate.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.limit);
  }

  isFirstPage(): boolean {
    return this.page === 0;
  }
  isLastPage(): boolean {
    return this.page >= this.totalPages - 1;
  }

  nextPage(): void {
    if (!this.isLastPage()) {
      this.page += this.limit;
    }
  }
  lastPage(): void {
    if (this.page > 0) this.page -= this.limit;
  }

  isMobile(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      userAgent.includes('mobi') ||
      userAgent.includes('android') ||
      userAgent.includes('iphone') ||
      userAgent.includes('ipad') ||
      userAgent.includes('ipod')
    );
  }
}
