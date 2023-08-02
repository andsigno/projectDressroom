import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { Categoria, Prodotto, Sottocategoria } from '../interfaces/Categoria';
import { Utente } from '../interfaces/Utente';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  utenteLoggato = new BehaviorSubject(null);

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

  /**
   * Metodo per effettuare il login
   * @param credenziali oggetto conente email e password
   * @returns utente se la login è corretta
   */
  login(credenziali: any): Observable<Utente> {
    // creo la url necessaria per interrogare il db sulla 
    // presenza di un utente con la stessa email
    const url = '/api/utenti?email=' + credenziali.email;
    // effettuo la chiamata al db
    return this.http.get<any[]>(url).pipe(
      // rimappo l'oggetto ricevuto controllando che sia corretto
      map((utenti: any[]) => {
        console.log("RIMAPPO IL RISULTATO", utenti);
        let utente = null;
        // verifico se il risultato mi restituisce degli utenti e prendo il primo
        if (utenti?.length > 0) {
          utente = utenti[0];
        }
        console.log("UTENTE RICAVATO", utente);
        // verifico che ho dei risultati e le credenziali siano corrette        
        if (utente && utente.password == credenziali.password) {
          // aggiorno i dati nel servizio sull'utente corrente
          this.utenteLoggato.next(utente);
          return utente;
        }
        return null;
      })
    );
  }

  /**
     * Metodo per effettuare la registrazione
     * @param utenteJoin utente che sta effettuando la registrazione
     * @returns utente se la login è corretta
     */
  join(utenteJoin: any): Observable<any> {
    // creo la url necessaria per interrogare il db sulla 
    // presenza di un utente con la stessa email
    const url = '/api/utenti?email=' + utenteJoin.email;
    // effettuo la chiamata al db per verificase se l'utente esiste già
    return this.http.get<any[]>(url).pipe(
      // rimappo l'oggetto ricevuto controllando che sia corretto
      switchMap((utenti: any[]) => {
        console.log("RIMAPPO IL RISULTATO", utenti);
        // verifico se il risultato mi restituisce degli utenti e ritorna null per mostrare errore
        if (utenti?.length > 0) {
          return of(null);
        }
        // aggiorno i dati nel servizio sull'utente corrente
        this.utenteLoggato.next(utenteJoin);
        return this.http.post('/api/utenti', utenteJoin)
      })
    );
  }
}
