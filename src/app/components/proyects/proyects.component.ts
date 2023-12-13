import { Component, OnInit } from '@angular/core';
import { Proyect, Proyects } from '@app/interfaces/Projects';
import { ApiService } from '@app/service/api.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
})
export class ProyectsComponent implements OnInit {
  projects!: Proyects;
  project: Proyect[] = [];
  page!: number;
  limit!: number;
  category!: string;
  activeCategory!: string;
  class: string = 'flex';
  class_card: string = 'hidden';

  constructor(private apiService: ApiService) {
    this.category = 'fullstack';
    this.activeCategory = 'fullstack';

    this.page = 0;
    if (this.isMobile()) {
      this.limit = 1;
    } else {
      this.limit = 6;
    }
  }
  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(): void {
    this.apiService.getProyects().subscribe({
      next: (data: Proyects) => {
        this.class = 'hidden';
        this.class_card = 'flex';
        this.projects = data;
        this.project = data.proyectos;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get totalItems(): number {
    return this.project.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems - this.limit);
  }

  isFirstPage(): boolean {
    return this.page === 0;
  }
  isLastPage(): boolean {
    return this.page >= this.totalPages;
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

  changeCategory(category: string): void {
    this.category = category;
    this.activeCategory = category;
    this.class = 'hidden';
    this.class_card = 'flex';
  }
}
