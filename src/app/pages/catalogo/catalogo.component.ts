import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryItem } from 'src/app/components/categoria/categoria.component';
import { Item } from 'src/app/interfaces/Categoria';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  subcategories: CategoryItem[] = [];
  items?: Item[];
  productvf: boolean = false;
  Obj: any;

  idCategoria: string | null = null;
  idSubcategoria: string | null = null;
  idProdotto: string | null = null;
  idItem: string | null = null;

  constructor(private route: ActivatedRoute, private commonService: CommonService) { }


  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get('idCategoria');
    this.idSubcategoria = this.route.snapshot.paramMap.get('idSubcategoria');
    this.idProdotto = this.route.snapshot.paramMap.get('idProdotto');
    this.idItem = this.route.snapshot.paramMap.get('idItem');

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
            this.items = categoria.items || [];
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
                  this.items = sottocategoria.items || [];
                }
              }
            })
          } else {
            this.items = categoria.items || [];
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
                      this.items = prodotto.items || [];
                    }
                  })
                } else {
                  this.items = sottocategoria.items || [];
                }
              }
            })
          } else {
            this.items = categoria.items || [];
          }
        }
      });
    });
  }

  private getAnItemFromCommonServices(nomeCategoria: string, nomeSottocategoria: string, nomeProdotto: string, nomeObj: string) {
    this.commonService.getAllCategorie().subscribe(categorie => {
      categorie.forEach(categoria => {
        if (categoria.nome == nomeCategoria) {
          if (categoria.hasSubCategories) {
            categoria.sottocategorie.forEach(sottocategoria => {
              if (sottocategoria.nome == nomeSottocategoria) {
                if (sottocategoria.hasSubCategories) {
                  sottocategoria.prodotti.forEach(prodotto => {
                    if (prodotto.nome == nomeProdotto) {
                      // this.items = prodotto.items || [];
                      prodotto.items.forEach(item => {
                        if (item.id == nomeObj) {
                          this.Obj = item.id
                        }
                      })

                    }
                  })
                } else {
                  this.items = sottocategoria.items || [];
                  this.productvf = true;
                }
              }
            })
          } else {
            this.items = categoria.items || [];
            this.productvf = true;
          }
        }
      });
    });
  }

}