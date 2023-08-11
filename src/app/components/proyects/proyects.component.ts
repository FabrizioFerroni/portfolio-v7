import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Content, Proyects } from '@app/interfaces/Projects';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
})
export class ProyectsComponent implements OnInit {
  projects!: Proyects;
  project: Content[] = [];
  page!: number;
  limit!: number;
  category!: string;
  activeCategory!: string;
  constructor(private http: HttpClient) {
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
    this.getAllProyects();
  }

  get totalItems(): number {
    return this.project.length;
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

  get(): Observable<Proyects> {
    return this.http.get<Proyects>('../../../assets/db/proyects.json');
  }

  getAllProyects(): void {
    this.get().subscribe(
      (data) => {
        this.projects = data;
        this.project = data.proyects;
      },
      (err) => {
        console.error(err);
      }
    );
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
  }
}
