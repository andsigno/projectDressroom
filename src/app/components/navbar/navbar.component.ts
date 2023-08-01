import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryItem } from '../categoria/categoria.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() categoryList: CategoryItem[] = [];

  constructor(private router: Router, private commonService: CommonService) { }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

  ngOnInit(): void {
    this.getAllCategorieFromCommonServices();
  }

  private getAllCategorieFromCommonServices() {
    this.commonService.getAllCategorie().subscribe(categorie => {
      this.categoryList = categorie.map(categoria => ({
        name: categoria.nome,
        path: categoria.nome
      }))
    });
  }

}
