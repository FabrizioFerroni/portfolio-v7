import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { ExperiencieComponent } from './components/experiencie/experiencie.component';
import { AboutComponent } from './components/about/about.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { TechsSkillsComponent } from './components/techs-skills/techs-skills.component';
import { CarrerComponent } from './components/carrer/carrer.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { BadgesComponent } from './shared/badges/badges.component';
import { SocialsIconsComponent } from './shared/socials-icons/socials-icons.component';
import { ProyectsPipe } from './pipes/proyects.pipe';
import { CertificatesPipe } from './pipes/certificates.pipe';
import { WorksPipe } from './pipes/works.pipe';
import { AcademysPipe } from './pipes/academys.pipe';
import { TestimonialsPipe } from './pipes/testimonials.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    ExperiencieComponent,
    AboutComponent,
    ProyectsComponent,
    CertificatesComponent,
    TechsSkillsComponent,
    CarrerComponent,
    TestimonialsComponent,
    ContactComponent,
    BadgesComponent,
    SocialsIconsComponent,
    ProyectsPipe,
    CertificatesPipe,
    WorksPipe,
    AcademysPipe,
    TestimonialsPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
