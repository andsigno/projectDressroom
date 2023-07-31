import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Prodotto, Sottocategoria } from '../interfaces/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  // restituisce tutti gli elementi presenti nell'array all'interno del db
  getAllCategorie(): Observable<Categoria[]> {
    const url = '/api/categorie';
    return this.http.get<any[]>(url);
  }

  getAllUtenti(): Observable<any[]> {
    const url = '/api/utenti';
    return this.http.get<any[]>(url);
  }
}
