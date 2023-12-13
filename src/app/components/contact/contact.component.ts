import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '@app/interfaces/Contact';
import { Mensaje } from '@app/interfaces/Mensaje';
import { ApiService } from '@app/service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactoForm: Contact = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  };

  mensaje: string = '';
  type: string = 'success';
  display: string = 'hidden';
  btn_load: boolean = false;
  mensaje_btn: string = 'Enviando Correo...';
  constructor(private apiService: ApiService) {}

  extractEmailAddress(href: string): string {
    if (href.startsWith('mailto:')) {
      return href.substring('mailto:'.length);
    }

    return href;
  }

  copyToClipboard(href: string) {
    const tempInput = document.createElement('input');
    tempInput.value = href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  contacto(data: NgForm): void {
    if (data.invalid) {
      return;
    }

    this.btn_load = true;
    this.mensaje_btn = `Enviando Correo...`;
    this.apiService.postContact(this.contactoForm).subscribe({
      next: (res: Mensaje) => {
        this.mensaje = res.message;
        this.btn_load = false;
        this.display = 'flex';
        setTimeout(() => {
          this.display = 'hidden';
        }, 3000);
        this.contactoForm = {
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          asunto: '',
          mensaje: '',
        };
      },
      error: (err) => {
        this.mensaje = err.error.mensaje;
        this.display = 'flex';
        this.type = 'error';
        setTimeout(() => {
          this.display = 'hidden';
        }, 3000);
      },
    });
  }
}
