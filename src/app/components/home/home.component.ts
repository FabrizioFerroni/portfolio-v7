import { Component, OnInit } from '@angular/core';
import { Cv } from '@app/interfaces/Cv';
import { Mensaje } from '@app/interfaces/Mensaje';
import { ApiService } from '@app/service/api.service';
import createSlug from '@app/utils/createSlug';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cv: Cv = {
    id: 0,
    nombre: '',
    actual: false,
    cv: '',
    btn_load: false,
    mensaje_btn: '',
  };

  class_dcv: string = 'hidden';
  type_dcv: string = '';
  msg_resp: string = '';

  pdfBlob: Blob | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCv();
  }

  getCv(): void {
    this.apiService.getCv().subscribe({
      next: (data: Cv) => {
        this.cv = data;
        this.cv.btn_load = false;
        this.cv.mensaje_btn = '';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  downloadCv(cv: Cv): void {
    let slug = createSlug(cv.nombre);
    cv.btn_load = true;
    cv.mensaje_btn = 'Descargando CV...';
    this.apiService.downloadCv(cv.cv).subscribe({
      next: (response: Blob) => {
        cv.btn_load = false;
        setTimeout(() => {
          this.pdfBlob = response;
          this.createDownloadLink(slug);
          this.apiService.postDownload(cv.id).subscribe({
            next: (res: Mensaje) => {
              this.msg_resp = res.message;
              this.class_dcv = 'flex';
              this.type_dcv = 'success';
              setTimeout(() => {
                this.class_dcv = 'hidden';
              }, 3000);
            },
            error: (err) => {
              console.error(err);
            },
          });
        }, 1000);
      },
      error: (err) => {
        console.error(err.error.mensaje);
        cv.btn_load = false;
      },
    });
  }

  // createDownloadLink(slug: string) {
  //   if (this.pdfBlob) {
  //     const url = window.URL.createObjectURL(this.pdfBlob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `${slug}.pdf`;
  //     link.style.display = 'none';
  //     document.body.appendChild(link);
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(link);
  //   }
  // }

  // createDownloadLink(slug: string) {
  //   if (this.pdfBlob) {
  //     const url = window.URL.createObjectURL(this.pdfBlob);
  //     window.open(url, '_blank'); // Abre el Blob en una nueva ventana para verificar
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `${slug}.pdf`;
  //     link.style.display = 'none';
  //     document.body.appendChild(link);
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(link);
  //   }
  // }

  createDownloadLink(slug: string) {
    if (this.pdfBlob) {
      const url = window.URL.createObjectURL(this.pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${slug}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
