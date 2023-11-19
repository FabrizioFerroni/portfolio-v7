import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Certificate, Certificates } from '@app/interfaces/Certificates';
import { ApiService } from '@app/service/api.service';
import createSlug from '@app/utils/createSlug';
// import { FileSaverService } from 'ngx-filesaver';

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
  pdfBlob: Blob | null = null;
  class: string = 'flex';

  constructor(private apiService: ApiService) {
    this.page = 0;
    if (this.isMobile()) {
      this.limit = 1;
    } else {
      this.limit = 3;
    }
  }

  ngOnInit(): void {
    this.getCertificados();
  }

  getCertificados(): void {
    this.apiService.getCertificates().subscribe({
      next: (data: Certificates) => {
        this.certificates = data;
        this.certificate = data.certificados.map(certificado => ({ ...certificado, btn_load: false, mensaje_btn: '' }));
        this.class = 'hidden';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  descargarCert(item: Certificate): void {
    // url: string, titulo: string
    let slug = createSlug(item.titulo);
    item.btn_load = true;
    item.mensaje_btn = `Descargando Certificado...`;
    this.apiService.downloadCertificates(item.certificado).subscribe({
      next: (response: Blob) => {
        item.btn_load = false;
        setTimeout(() => {
          this.pdfBlob = response;
          this.createDownloadLink(slug);
        });
      },
      error: (err) => {
        console.error(err.error.mensaje);
        item.btn_load = false;
      },
    });
  }

  createDownloadLink(slug: string) {
    if (this.pdfBlob) {
      const url = window.URL.createObjectURL(this.pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${slug}.pdf`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
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
