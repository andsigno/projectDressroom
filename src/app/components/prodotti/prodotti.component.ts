import { Component, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/Categoria';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent {

  @Input() itemList: Item[] = []

}
