import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryItem } from 'src/app/components/categoria/categoria.component';
import { ItemItem } from 'src/app/components/prodotti/prodotti.component';
import { Item } from 'src/app/interfaces/Categoria';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  subcategories: CategoryItem[] = [];
  items?: ItemItem[];
  obj?: Item;

  idCategoria?: string;
  idSubcategoria?: string;
  idProdotto?: string;
  idItem?: string;

  constructor(private route: ActivatedRoute, private commonService: CommonService) { }


  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get('idCategoria') || undefined;
    this.idSubcategoria = this.route.snapshot.paramMap.get('idSubcategoria') || undefined;
    this.idProdotto = this.route.snapshot.paramMap.get('idProdotto') || undefined;
    this.idItem = this.route.snapshot.paramMap.get('idItem') || undefined;

    if (this.idCategoria && this.idSubcategoria && this.idProdotto && this.idItem) {
      this.getAnItemFromCommonServices(this.idCategoria, this.idSubcategoria, this.idProdotto, this.idItem);
    } else if (this.idCategoria && this.idSubcategoria && this.idProdotto) {
      this.getAllItemsFromCommonServices(this.idCategoria, this.idSubcategoria, this.idProdotto);
    } else if (this.idCategoria && this.idSubcategoria) {
      this.getAllProductsFromCommonServices(this.idCategoria, this.idSubcategoria);
    } else if (this.idCategoria) {
      this.getAllSubcategorieFromCommonServices(this.idCategoria);
    } else {
      console.log('Nothing to do here.');
    }
  }

  private getAllSubcategorieFromCommonServices(nomeCategoria: string) {
    this.commonService.getAllCategorie().subscribe(categorie => {
      categorie.forEach(categoria => {
        if (categoria.nome == nomeCategoria) {
          if (categoria.hasSubCategories) {
            this.subcategories = categoria.sottocategorie.map(sottocategoria => ({
              name: sottocategoria.nome,
              path: nomeCategoria + '/' + sottocategoria.nome
            }));
          } else {
            this.items = categoria.items?.map(item => ({
              data: item,
              path: nomeCategoria + '/' + item.id
            }));
          }
        }
      });
    });
  }

  private getAllProductsFromCommonServices(nomeCategoria: string, nomeSottocategoria: string) {
    this.commonService.getAllCategorie().subscribe(categorie => {
      categorie.forEach(categoria => {
        if (categoria.nome == nomeCategoria) {
          if (categoria.hasSubCategories) {
            categoria.sottocategorie.forEach(sottocategoria => {
              if (sottocategoria.nome == nomeSottocategoria) {
                if (sottocategoria.hasSubCategories) {
                  this.subcategories = sottocategoria.prodotti.map(prodotto => ({
                    name: prodotto.nome,
                    path: nomeCategoria + '/' + nomeSottocategoria + '/' + prodotto.nome
                  }));
                } else {
                  this.items = sottocategoria.items?.map(item => ({
                    data: item,
                    path: nomeCategoria + '/' + nomeSottocategoria + '/' + item.id
                  }));
                }
              }
            })
          } else {
            this.items = categoria.items?.map(item => ({
              data: item,
              path: nomeCategoria + '/' + item.id
            }));
          }
        }
      });
    });
  }

  private getAllItemsFromCommonServices(nomeCategoria: string, nomeSottocategoria: string, nomeProdotto: string) {
    this.commonService.getAllCategorie().subscribe(categorie => {
      categorie.forEach(categoria => {
        if (categoria.nome == nomeCategoria) {
          if (categoria.hasSubCategories) {
            categoria.sottocategorie.forEach(sottocategoria => {
              if (sottocategoria.nome == nomeSottocategoria) {
                if (sottocategoria.hasSubCategories) {
                  sottocategoria.prodotti.forEach(prodotto => {
                    if (prodotto.nome == nomeProdotto) {
                      this.items = prodotto.items?.map(item => ({
                        data: item,
                        path: nomeCategoria + '/' + nomeSottocategoria + '/' + prodotto.nome + '/' + item.id
                      }));
                    }
                  })
                } else {
                  this.items = sottocategoria.items?.map(item => ({
                    data: item,
                    path: nomeCategoria + '/' + nomeSottocategoria + '/' + item.id
                  }));
                }
              }
            })
          } else {
            this.items = categoria.items?.map(item => ({
              data: item,
              path: nomeCategoria + '/' + item.id
            }));
          }
        }
      });
    });
  }

  private getAnItemFromCommonServices(nomeCategoria: string, nomeSottocategoria: string, nomeProdotto: string, idItem: string) {
    this.commonService.getAllCategorie().subscribe(categorie => {
      categorie.forEach(categoria => {
        if (categoria.nome == nomeCategoria) {
          if (categoria.hasSubCategories) {
            categoria.sottocategorie.forEach(sottocategoria => {
              if (sottocategoria.nome == nomeSottocategoria) {
                if (sottocategoria.hasSubCategories) {
                  sottocategoria.prodotti.forEach(prodotto => {
                    if (prodotto.nome == nomeProdotto) {
                      this.obj = prodotto.items?.find(item => item.id == idItem);
                    }
                  })
                } else {
                  this.obj = sottocategoria.items?.find(item => item.id == idItem);
                }
              }
            })
          } else {
            this.obj = categoria.items?.find(item => item.id == idItem);
          }
        }
      });
    });
  }
}