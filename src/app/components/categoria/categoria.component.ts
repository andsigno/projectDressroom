import { Component, Input } from '@angular/core';

export interface CategoryItem {
  name: string
  path: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  @Input() categoryList: CategoryItem[] = [];
  @Input() showCategoryImg: boolean = false;

  constructor() { }

  ngOnInit(): void { }
}
