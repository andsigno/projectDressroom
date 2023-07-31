import { Component, Input } from '@angular/core';
import { CategoryItem } from 'src/app/components/categoria/categoria.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() categories: CategoryItem[] = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllCategorieFromCommonServices();
  }

  private getAllCategorieFromCommonServices() {
    this.commonService.getAllCategorie().subscribe(categorie => {
      this.categories = categorie.map(categoria => ({
        name: categoria.nome,
        path: categoria.nome
      }))
    });
  }

}
