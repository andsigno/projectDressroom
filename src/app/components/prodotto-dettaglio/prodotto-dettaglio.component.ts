import { Component, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/Categoria';

@Component({
  selector: 'app-prodotto-dettaglio',
  templateUrl: './prodotto-dettaglio.component.html',
  styleUrls: ['./prodotto-dettaglio.component.scss']
})
export class ProdottoDettaglioComponent {

  @Input() itemList?: Item[];

}
