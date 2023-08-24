import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Testimonial, Testimonials } from '@app/interfaces/Testimonials';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  testimonials!: Testimonials;
  testimonial: Testimonial[] = [];
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
    this.getAllTestimonials();
  }

  get(): Observable<Testimonials> {
    return this.http.get<Testimonials>('../../../assets/db/testimonials.json');
  }

  getAllTestimonials(): void {
    this.get().subscribe(
      (data: Testimonials) => {
        this.testimonials = data;
        this.testimonial = data.testimonials;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get totalItems(): number {
    return this.testimonial.length;
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
