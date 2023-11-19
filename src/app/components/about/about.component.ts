import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  anioNacimiento: number = 1996;

  calcularEdad(): number {
    const añoActual = new Date().getFullYear();
    return añoActual - this.anioNacimiento;
  }
}
