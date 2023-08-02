import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = "";
  password = "";

  constructor(
    private router: Router,
    private servizio: CommonService) { }

  login() {
    // sto dichiarndo una costante crendiali con i valori inseriti nel form
    const credenziali = {
      email: this.email,
      password: this.password
    }
    // stampo le credenzili
    console.log("AVVIO DEL LOGIN", credenziali);
    this.servizio.login(credenziali).subscribe((risultato) => {
      console.log("LOGIN RISULTATO", risultato);
      if (risultato) {
        this.router.navigateByUrl('/dashboard');
      }
    });
    return false;
  }

  reset() {
    this.email = "";
    this.password = "";

    console.log("RESET FORM");
    this.router.navigateByUrl('/dashboard');
  }
}
