import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryItem } from '../categoria/categoria.component';
import { CommonService } from 'src/app/services/common.service';
import { Utente } from 'src/app/interfaces/Utente';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() categoryList: CategoryItem[] = [];

  utenteLoggato: Utente | null = null;

  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

  ngOnInit(): void {
    this.getAllCategorieFromCommonServices();
    this.getSessionUtente();
  }

  private getAllCategorieFromCommonServices() {
    this.commonService.getAllCategorie().subscribe(categorie => {
      this.categoryList = categorie.map(categoria => ({
        name: categoria.nome,
        path: categoria.nome
      }))
    });
  }


  private getSessionUtente() {
    this.commonService.utenteLoggato.subscribe((utente) => {
      if (utente) {
        this.utenteLoggato = utente;
        sessionStorage.setItem('jwt', utente.token);
      } else {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
          this.commonService.getUtenteFromToken(jwt).subscribe(
            (utente) => {
              this.utenteLoggato = utente;
            }
          )
        }
      }
    })
  }

}
