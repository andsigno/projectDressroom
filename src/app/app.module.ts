import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { BImageComponent } from './components/b-image/b-image.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { ProdottoDettaglioComponent } from './components/prodotto-dettaglio/prodotto-dettaglio.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    CatalogoComponent,
    CategoriaComponent,
    BImageComponent,
    ProdottiComponent,
    ProdottoDettaglioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }