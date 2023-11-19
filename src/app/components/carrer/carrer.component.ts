import { Component, OnInit } from '@angular/core';
import { Work, Works } from '@app/interfaces/Works';
import { Academy, Academys } from '@app/interfaces/Academys';
import { ApiService } from '@app/service/api.service';

@Component({
  selector: 'app-carrer',
  templateUrl: './carrer.component.html',
  styleUrls: ['./carrer.component.scss'],
})
export class CarrerComponent implements OnInit {
  works!: Works;
  work: Work[] = [];

  academys!: Academys;
  academy: Academy[] = [];

  pageWorks!: number;
  limitWorks!: number;

  pageAcademys!: number;
  limitAcademys!: number;

  class: string = 'flex';
  class_type: string = 'hidden';

  constructor(private apiService: ApiService) {
    this.pageWorks = 0;
    if (this.isMobile()) {
      this.limitWorks = 1;
    } else {
      this.limitWorks = 3;
    }

    this.pageAcademys = 0;
    if (this.isMobile()) {
      this.limitAcademys = 1;
    } else {
      this.limitAcademys = 3;
    }
  }
  ngOnInit(): void {
    this.getEstudios();
    this.getTrabajos();
  }

  getTrabajos(): void {
    this.apiService.getWorks().subscribe({
      next: (data: Works) => {
        this.works = data;
        this.work = data.trabajos;
        this.class = 'hidden';
        this.class_type = 'flex';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getEstudios(): void {
    this.apiService.getAcademys().subscribe({
      next: (data: Academys) => {
        this.academys = data;
        this.academy = data.estudios;
        this.class = 'hidden';
        this.class_type = 'flex';
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get totalItemsW(): number {
    return this.work.length;
  }

  get totalPagesW(): number {
    return Math.ceil(this.totalItemsW / this.limitWorks);
  }

  isFirstPageW(): boolean {
    return this.pageWorks === 0;
  }
  isLastPageW(): boolean {
    return this.pageWorks >= this.totalPagesW - 1;
  }

  nextPageW(): void {
    if (!this.isLastPageW()) {
      this.pageWorks += this.limitWorks;
    }
  }
  lastPageW(): void {
    if (this.pageWorks > 0) this.pageWorks -= this.limitWorks;
  }

  // Academy
  get totalItemsA(): number {
    return this.academy.length;
  }

  get totalPagesA(): number {
    return Math.ceil(this.totalItemsA / this.limitAcademys);
  }

  isFirstPageA(): boolean {
    return this.pageAcademys === 0;
  }
  isLastPageA(): boolean {
    return this.pageAcademys >= this.totalPagesA - 1;
  }

  nextPageA(): void {
    if (!this.isLastPageA()) {
      this.pageAcademys += this.limitAcademys;
    }
  }
  lastPageA(): void {
    if (this.pageAcademys > 0) this.pageAcademys -= this.limitAcademys;
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
