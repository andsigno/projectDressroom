import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/interfaces/Utente';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {

  constructor(
    private servizio: CommonService,
    private router: Router
  ) {

  }

  nome: string = '';
  cognome: string = '';
  data_di_nascita: Date = new Date();
  email: string = '';
  password: string = '';

  join() {
    // sto dichiarndo una costante crendiali con i valori inseriti nel form
    const utente = {
      nome: this.nome,
      cognome: this.cognome,
      data_di_nascita: this.data_di_nascita,
      email: this.email,
      password: this.password
    }
    // stampo le credenzili
    console.log("AVVIO DELLA REGISTAZIONE", utente);
    this.servizio.join(utente).subscribe((risultato) => {
      console.log("REGISTRAZIONE RISULTATO", risultato);
      if (risultato) {
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('Errore durante la registrazione.');
      }
    });
    return false;
  }

  reset() {
    this.email = "";
    this.password = "";
    this.nome = "";
    this.cognome = "";
    this.data_di_nascita = new Date();

    console.log("RESET FORM");
    this.router.navigateByUrl('/dashboard');
  }

}
